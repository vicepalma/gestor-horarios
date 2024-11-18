package utils

import (
	"os"

	log "github.com/sirupsen/logrus"
)

func InitLogger() {
	// Configuración básica del logger
	log.SetFormatter(&log.JSONFormatter{}) // Logs en formato JSON
	log.SetOutput(os.Stdout)               // Salida estándar
	log.SetLevel(log.InfoLevel)            // Nivel de logs (Info, Warning, Error, etc.)
}
