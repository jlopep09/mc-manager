# Compilar aplicación Go
FROM golang:1.27-alpine AS builder

WORKDIR /app

COPY go.mod .
COPY main.go .

RUN CGO_ENABLED=0 go build \
    -trimpath \
    -ldflags="-s -w" \
    -o manager .

# Imagen final
FROM docker:cli

RUN apk add --no-cache docker-cli-compose \
    && addgroup -S -g 10001 manager \
    && adduser -S -D -H -u 10001 -G manager manager

COPY --from=builder /app/manager /usr/local/bin/manager

USER 10001:10001

ENTRYPOINT ["/usr/local/bin/manager"]