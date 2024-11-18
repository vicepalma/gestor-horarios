package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
)

func GetResources(c *gin.Context) {
	var resources []models.Resource
	database.DB.Find(&resources)
	c.JSON(http.StatusOK, resources)
}

func CreateResource(c *gin.Context) {
	var resource models.Resource
	if err := c.ShouldBindJSON(&resource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&resource)
	c.JSON(http.StatusCreated, resource)
}
