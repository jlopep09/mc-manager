# mc-manager

### Backend

La carpeta `backend` contiene una aplicación Spring Boot con:

- Spring Web
- Spring Data JPA
- Jersey
- MariaDB/MySQL connector
- Docker-ready setup


## 🚀 Requisitos

Antes de arrancarlo, asegúrate de tener instalado:

- Java 11+ (backend)
- Java 21+ (para `Fundamentos` si quieres ejecutar ese módulo directamente)
- Maven
- Docker + Docker Compose

## 🛠️ Cómo arrancar el proyecto

### 1) Configurar variables de entorno

Copia el ejemplo:

```bash
copy .env.example .env
```

Ajusta los valores de:

- `MYSQL_DATABASE`
- `MYSQL_ROOT_PASSWORD`

### 2) Levantar la base de datos y el backend

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto levanta:

- un contenedor con MariaDB
- un contenedor con la API backend

La aplicación queda disponible en:

- http://localhost:8080
