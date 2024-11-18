package routes

import (
	"gestor-horarios/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// Rutas de Recursos
	r.GET("/resources", controllers.GetResources)
	r.POST("/resources", controllers.CreateResource)

	// Rutas de Servicios
	r.GET("/services", controllers.GetServices)
	r.POST("/services", controllers.CreateService)

	// Rutas de Reservas
	r.GET("/reservations", controllers.GetReservations)
	r.POST("/reservations", controllers.CreateReservation)
}
