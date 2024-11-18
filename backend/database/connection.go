package database

import (
	"log"

	"gestor-horarios/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=db user=postgres password=postgres dbname=gestor_horarios port=5432 sslmode=disable"
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectar a la base de datos:", err)
	}

	log.Println("Conexión exitosa a la base de datos")

	// Migrar modelos
	DB.AutoMigrate(&models.Resource{}, &models.Service{}, &models.Reservation{})
}
