package routes

import (
	"gestor-horarios/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {

	// Configurar CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5173", "http://localhost:5173"}, // Orígenes permitidos
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},        // Métodos permitidos
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},        // Encabezados permitidos
		ExposeHeaders:    []string{"Content-Length"},                                 // Encabezados expuestos
		AllowCredentials: true,                                                       // Permitir cookies o credenciales
	}))

	r.POST("/login", controllers.Login)

	// Rutas protegidas con autenticación
	// protected := r.Group("/")
	// protected.Use(middleware.AuthMiddleware())
	// {
	// 	// Rutas protegidas con autorización por rol
	// 	protected.POST("/resources", middleware.RoleAuthorization("admin"), controllers.CreateResource)
	// 	protected.GET("/resources", controllers.GetResources)
	// }

	// Rutas de Recursos
	r.GET("/resources", controllers.GetResources)
	r.POST("/resources", controllers.CreateResource)
	r.GET("/resources/:id", controllers.GetResourceByID)
	r.PUT("/resources/:id", controllers.UpdateResource)
	r.DELETE("/resources/:id", controllers.DeleteResource)

	// Rutas de Servicios
	r.GET("/services", controllers.GetServices)
	r.POST("/services", controllers.CreateService)
	r.GET("/services/:id", controllers.GetServiceByID)
	r.PUT("/services/:id", controllers.UpdateService)
	r.DELETE("/services/:id", controllers.DeleteService)

	// Rutas de Reservas
	r.GET("/reservations", controllers.GetReservations)
	r.POST("/reservations", controllers.CreateReservation)
	r.GET("/reservations/:id", controllers.GetReservationByID)
	r.PUT("/reservations/:id", controllers.UpdateReservation)
	r.DELETE("/reservations/:id", controllers.DeleteReservation)
	r.GET("/reservations/available", controllers.GetAvailableTimes)

}
