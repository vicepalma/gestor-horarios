package models

import "gorm.io/gorm"

type Service struct {
	gorm.Model
	Name        string `json:"name" gorm:"not null"`
	Duration    int    `json:"duration" gorm:"not null"` // Duración en minutos
	Description string `json:"description"`
}
