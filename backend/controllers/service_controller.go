package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
)

// GetServices - Lista todos los servicios disponibles
func GetServices(c *gin.Context) {
	var services []models.Service
	database.DB.Find(&services)
	c.JSON(http.StatusOK, services)
}

// GetServiceByID - Obtiene los detalles de un servicio específico
func GetServiceByID(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	c.JSON(http.StatusOK, service)
}

// CreateService - Crea un nuevo servicio
func CreateService(c *gin.Context) {
	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&service)
	c.JSON(http.StatusCreated, service)
}

// UpdateService - Actualiza los detalles de un servicio existente
func UpdateService(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	var input models.Service
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Actualizar los campos
	service.Name = input.Name
	service.Description = input.Description
	service.Duration = input.Duration
	database.DB.Save(&service)

	c.JSON(http.StatusOK, service)
}

// DeleteService - Elimina un servicio específico
func DeleteService(c *gin.Context) {
	id := c.Param("id")
	var service models.Service

	if err := database.DB.First(&service, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	database.DB.Delete(&service)
	c.JSON(http.StatusNoContent, gin.H{})
}
