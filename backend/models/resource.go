package models

import "gorm.io/gorm"

type Resource struct {
	gorm.Model
	Name        string `json:"name" gorm:"not null"`
	Description string `json:"description"`
}
