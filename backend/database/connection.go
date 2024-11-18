package database

import (
	"gestor-horarios/utils"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// Construir el DSN desde las variables de entorno
	dsn := "host=" + utils.GetEnv("DB_HOST", "localhost") +
		" user=" + utils.GetEnv("DB_USER", "postgres") +
		" password=" + utils.GetEnv("DB_PASSWORD", "postgres") +
		" dbname=" + utils.GetEnv("DB_NAME", "postgres") +
		" port=" + utils.GetEnv("DB_PORT", "5432") +
		" sslmode=disable"

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectar a la base de datos:", err)
	}

	log.Println("Conexión exitosa a la base de datos")
}
