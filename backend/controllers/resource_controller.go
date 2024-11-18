package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
)

// GetResources - Lista todos los recursos disponibles
func GetResources(c *gin.Context) {
	var resources []models.Resource
	database.DB.Find(&resources)
	c.JSON(http.StatusOK, resources)
}

// GetResourceByID - Obtiene los detalles de un recurso específico
func GetResourceByID(c *gin.Context) {
	id := c.Param("id")
	var resource models.Resource

	if err := database.DB.First(&resource, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resource not found"})
		return
	}

	c.JSON(http.StatusOK, resource)
}

// CreateResource - Crea un nuevo recurso
func CreateResource(c *gin.Context) {
	var resource models.Resource
	if err := c.ShouldBindJSON(&resource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&resource)
	c.JSON(http.StatusCreated, resource)
}

// UpdateResource - Actualiza los detalles de un recurso existente
func UpdateResource(c *gin.Context) {
	id := c.Param("id")
	var resource models.Resource

	if err := database.DB.First(&resource, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resource not found"})
		return
	}

	var input models.Resource
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Actualizar los campos
	resource.Name = input.Name
	resource.Description = input.Description
	database.DB.Save(&resource)

	c.JSON(http.StatusOK, resource)
}

// DeleteResource - Elimina un recurso específico
func DeleteResource(c *gin.Context) {
	id := c.Param("id")
	var resource models.Resource

	if err := database.DB.First(&resource, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resource not found"})
		return
	}

	database.DB.Delete(&resource)
	c.JSON(http.StatusNoContent, gin.H{})
}
