package models

import "time"

type Service struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"size:100;not null" json:"name"`
	Description string    `json:"description"`
	Duration    int       `gorm:"not null" json:"duration"` // Duración en minutos
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
