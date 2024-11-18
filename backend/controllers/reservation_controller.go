package controllers

import (
	"net/http"

	"gestor-horarios/database"
	"gestor-horarios/models"

	"github.com/gin-gonic/gin"
)

func GetReservations(c *gin.Context) {
	var reservations []models.Reservation
	database.DB.Preload("Resource").Preload("Service").Find(&reservations)
	c.JSON(http.StatusOK, reservations)
}

func CreateReservation(c *gin.Context) {
	var reservation models.Reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&reservation)
	c.JSON(http.StatusCreated, reservation)
}
