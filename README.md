# mc-manager
Aplicación para la gestión de servidores MC
Aplicación para la gestión de servidores de MC virtualizados con docker compose. Se aporta a continuación el contenido de el compose para crear el servicio del servidor. Está preparado para buscar los archivos del servidor en la carpeta ./server


### compose.yml
```compose.yml

services:
  minecraft:
    image: eclipse-temurin:25-jre
    container_name: minecraft
    restart: unless-stopped

    working_dir: /server

    ports:
      - "25565:25565"
    volumes:
      - ./server:/server

    command:
      - java
      - -Xms4G
      - -Xmx4G
      - -jar
      - paper.jar
      - --nogui


```

## Pasos de ejecución
1. Configurar el archivo .env, incluyendo la ruta del servicio en `MC_SERVER_PATH`
2. Crear la red docker solicitada:
```
docker network create --driver bridge --internal minecraft-control
```
3. Ejecutar el siguiente comando
```
docker compose up --build
```