package main

import (
	"gestor-horarios/database"
	"gestor-horarios/routes"
	"gestor-horarios/utils"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Cargar variables de entorno
	utils.LoadEnv()

	// Inicializar logger
	utils.InitLogger()

	// Configurar la aplicación
	r := gin.Default()

	// Conexión a la base de datos
	database.ConnectDB()
	//migraciones
	database.Migrate()

	// Registrar rutas
	routes.RegisterRoutes(r)

	// Iniciar el servidor
	port := utils.GetEnv("APP_PORT", "8080")
	log.Printf("Servidor iniciado en el puerto %s", port)
	r.Run(":" + port)
}
