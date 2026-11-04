
package main

import (
	"context"
	"crypto/subtle"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"time"
)

type Response struct {
	Success bool   `json:"success"`
	Output  string `json:"output"`
}

var operationMutex sync.Mutex

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
				http.Error(w, "Method not allowed", 405)
				return
			}
			args = []string{"up", "-d"}

		case "/v1/stop":
			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", 405)
				return
			}
			args = []string{"down", "--timeout", "60"}

		case "/v1/restart":
			if r.Method != http.MethodPost {
				http.Error(w, "Method not allowed", 405)
				return
			}
			args = []string{"restart", "--timeout", "60"}

		case "/v1/status":
			if r.Method != http.MethodGet {
				http.Error(w, "Method not allowed", 405)
				return
			}
			args = []string{"ps"}

		default:
			http.NotFound(w, r)
			return
		}

		// Evitar operaciones simultáneas
		operationMutex.Lock()
		defer operationMutex.Unlock()

		ctx, cancel := context.WithTimeout(
			context.Background(),
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

		result := Response{
			Success: err == nil,
			Output:  string(output),
		}

		w.Header().Set("Content-Type", "application/json")

		if err != nil {
			w.WriteHeader(http.StatusBadGateway)
		}

		json.NewEncoder(w).Encode(result)
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
