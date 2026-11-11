
package main

import (
	"bufio"
	"context"
	"crypto/subtle"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

// Información de cada contenedor
type Container struct {
	Name    string `json:"name"`
	Image   string `json:"image"`
	Service string `json:"service"`
	Created string `json:"created"`
	Status  string `json:"status"`
	Ports   string `json:"ports"`
}

// Estructura original devuelta por Docker Compose
type DockerContainer struct {
	Name      string `json:"Name"`
	Image     string `json:"Image"`
	Service   string `json:"Service"`
	CreatedAt string `json:"CreatedAt"`
	State     string `json:"State"`
	Status    string `json:"Status"`
	Publishers []struct {
		URL           string `json:"URL"`
		TargetPort    int    `json:"TargetPort"`
		PublishedPort int    `json:"PublishedPort"`
		Protocol      string `json:"Protocol"`
	} `json:"Publishers"`
}

// Respuesta de la API
type Response struct {
	Success    bool        `json:"success"`
	Containers []Container `json:"containers,omitempty"`
	Output     string      `json:"output,omitempty"`
	Error      string      `json:"error,omitempty"`
}

var operationMutex sync.Mutex

// Convierte los puertos de Docker a texto
func formatPorts(publishers []struct {
	URL           string `json:"URL"`
	TargetPort    int    `json:"TargetPort"`
	PublishedPort int    `json:"PublishedPort"`
	Protocol      string `json:"Protocol"`
}) string {

	var ports []string

	for _, port := range publishers {
		if port.PublishedPort == 0 {
			continue
		}

		url := port.URL
		if url == "" {
			url = "0.0.0.0"
		}

		ports = append(ports, fmt.Sprintf(
			"%s:%d->%d/%s",
			url,
			port.PublishedPort,
			port.TargetPort,
			port.Protocol,
		))
	}

	return strings.Join(ports, ", ")
}

// Procesa la salida JSON de Docker Compose
func parseDockerOutput(output string) ([]Container, error) {

	var containers []Container

	scanner := bufio.NewScanner(strings.NewReader(output))

	// Aumentar el límite de lectura por si hay muchas columnas
	scanner.Buffer(make([]byte, 4096), 1024*1024)

	for scanner.Scan() {

		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			continue
		}

		var dockerContainer DockerContainer

		if err := json.Unmarshal([]byte(line), &dockerContainer); err != nil {
			return nil, err
		}

		containers = append(containers, Container{
			Name:    dockerContainer.Name,
			Image:   dockerContainer.Image,
			Service: dockerContainer.Service,
			Created: dockerContainer.CreatedAt,
			Status:  dockerContainer.Status,
			Ports:   formatPorts(dockerContainer.Publishers),
		})
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return containers, nil
}

func main() {

	token := os.Getenv("MANAGER_TOKEN")
	projectDir := os.Getenv("MC_SERVER_PATH")

	if len(token) < 32 {
		log.Fatal("MANAGER_TOKEN must have at least 32 characters")
	}

	if projectDir == "" {
		log.Fatal("MC_SERVER_PATH must be configured")
	}

	composeFile := filepath.Join(projectDir, "compose.yml")

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		// Autenticación
		expected := "Bearer " + token

		if subtle.ConstantTimeCompare(
			[]byte(r.Header.Get("Authorization")),
			[]byte(expected),
		) != 1 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		var args []string

		switch r.URL.Path {

		case "/v1/start":

			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			args = []string{"up", "-d"}

		case "/v1/stop":

			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			args = []string{"down", "--timeout", "60"}

		case "/v1/restart":

			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			args = []string{"restart", "--timeout", "60"}

		case "/v1/status":

			if r.Method != http.MethodGet {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			args = []string{"ps", "--format", "json"}

		default:
			http.NotFound(w, r)
			return
		}

		// Evitar operaciones simultáneas
		operationMutex.Lock()
		defer operationMutex.Unlock()

		ctx, cancel := context.WithTimeout(
			r.Context(),
			5*time.Minute,
		)
		defer cancel()

		commandArgs := append([]string{
			"compose",
			"--project-directory", projectDir,
			"-f", composeFile,
		}, args...)

		cmd := exec.CommandContext(ctx, "docker", commandArgs...)
		cmd.Dir = projectDir

		output, err := cmd.CombinedOutput()

		w.Header().Set("Content-Type", "application/json")

		// Error ejecutando Docker
		if err != nil {

			w.WriteHeader(http.StatusBadGateway)

			json.NewEncoder(w).Encode(Response{
				Success: false,
				Error:   string(output),
			})

			return
		}

		// Respuesta del endpoint STATUS
		if r.URL.Path == "/v1/status" {

			containers, err := parseDockerOutput(string(output))

			if err != nil {

				w.WriteHeader(http.StatusInternalServerError)

				json.NewEncoder(w).Encode(Response{
					Success: false,
					Error:   "Error parsing Docker response: " + err.Error(),
				})

				return
			}

			json.NewEncoder(w).Encode(Response{
				Success:    true,
				Containers: containers,
			})

			return
		}

		// Respuesta de start, stop y restart
		json.NewEncoder(w).Encode(Response{
			Success: true,
			Output:  string(output),
		})
	})

	server := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      310 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Println("Minecraft Manager listening on :8080")

	log.Fatal(server.ListenAndServe())
}
