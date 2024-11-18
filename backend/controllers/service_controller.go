package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
)

func GetServices(c *gin.Context) {
	var services []models.Service
	database.DB.Find(&services)
	c.JSON(http.StatusOK, services)
}

func CreateService(c *gin.Context) {
	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&service)
	c.JSON(http.StatusCreated, service)
}
