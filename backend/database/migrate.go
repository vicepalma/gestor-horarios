package database

import (
	"gestor-horarios/models"
)

func Migrate() {
	if DB == nil {
		ConnectDB() // Usa ConnectDB desde connection.go si no se ha llamado previamente.
	}

	// Migraciones automáticas
	DB.AutoMigrate(
		&models.User{},
		&models.Resource{},
		&models.Service{},
		&models.Reservation{},
		&models.Token{},
	)
}
