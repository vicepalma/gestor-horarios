package main

import (
	"gestor-horarios/database"
	"gestor-horarios/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Conectar a la base de datos
	database.ConnectDB()

	// Registrar rutas
	routes.RegisterRoutes(r)

	// Iniciar el servidor
	r.Run(":8080")
}
