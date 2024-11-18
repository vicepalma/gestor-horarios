package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// GetReservations - Lista todas las reservas con detalles de recurso y servicio
func GetReservations(c *gin.Context) {
	var reservations []models.Reservation

	// Soporte para filtros (opcional)
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")
	resourceID := c.Query("resource_id")
	serviceID := c.Query("service_id")

	query := database.DB.Preload("Resource").Preload("Service")

	if startDate != "" && endDate != "" {
		query = query.Where("start_time BETWEEN ? AND ?", startDate, endDate)
	}
	if resourceID != "" {
		query = query.Where("resource_id = ?", resourceID)
	}
	if serviceID != "" {
		query = query.Where("service_id = ?", serviceID)
	}

	query.Find(&reservations)
	c.JSON(http.StatusOK, reservations)
}

// GetReservationByID - Obtiene los detalles de una reserva específica
func GetReservationByID(c *gin.Context) {
	id := c.Param("id")
	var reservation models.Reservation

	if err := database.DB.Preload("Resource").Preload("Service").First(&reservation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	c.JSON(http.StatusOK, reservation)
}

func GetAvailableTimes(c *gin.Context) {
	resourceID := c.Query("resource_id")
	serviceID := c.Query("service_id")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")

	if resourceID == "" || serviceID == "" || startDate == "" || endDate == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required query parameters"})
		return
	}

	var reservations []models.Reservation
	database.DB.Where("resource_id = ? AND start_time BETWEEN ? AND ?", resourceID, startDate, endDate).Find(&reservations)

	c.JSON(http.StatusOK, reservations)
}

// CreateReservation - Crea una nueva reserva
func CreateReservation(c *gin.Context) {
	var reservation models.Reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		log.WithFields(log.Fields{
			"error": err.Error(),
		}).Error("Error al bindear los datos de la reserva")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validar que el servicio exista
	var service models.Service
	if err := database.DB.First(&service, reservation.ServiceID).Error; err != nil {
		log.WithFields(log.Fields{
			"service_id": reservation.ServiceID,
		}).Error("Service not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service not found"})
		return
	}

	// Crear la reserva
	database.DB.Create(&reservation)
	log.WithFields(log.Fields{
		"reservation_id": reservation.ID,
		"service_id":     reservation.ServiceID,
		"resource_id":    reservation.ResourceID,
	}).Info("Reserva creada exitosamente")
	c.JSON(http.StatusCreated, reservation)
}

// UpdateReservation - Actualiza los detalles de una reserva existente
func UpdateReservation(c *gin.Context) {
	id := c.Param("id")
	var reservation models.Reservation

	if err := database.DB.First(&reservation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	var input models.Reservation
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validar conflictos de horario
	var conflict models.Reservation
	if err := database.DB.Where("resource_id = ? AND id != ? AND ((start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?))",
		input.ResourceID, id, input.StartTime, input.StartTime, input.EndTime, input.EndTime).
		First(&conflict).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Time conflict with another reservation"})
		return
	}

	var service models.Service
	if err := database.DB.First(&service, reservation.ServiceID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Service not found"})
		return
	}

	// Validación de duración
	if reservation.EndTime.Sub(reservation.StartTime).Minutes() != float64(service.Duration) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reservation duration does not match service duration"})
		return
	}

	// Actualizar los campos
	reservation.ResourceID = input.ResourceID
	reservation.ServiceID = input.ServiceID
	reservation.StartTime = input.StartTime
	reservation.EndTime = input.EndTime
	database.DB.Save(&reservation)

	c.JSON(http.StatusOK, reservation)
}

// DeleteReservation - Elimina una reserva específica
func DeleteReservation(c *gin.Context) {
	id := c.Param("id")
	var reservation models.Reservation

	if err := database.DB.First(&reservation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	database.DB.Delete(&reservation)
	c.JSON(http.StatusNoContent, gin.H{})
}
