package models

import (
	"time"
)

type Reservation struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	ResourceID uint      `gorm:"not null" json:"resource_id"`
	Resource   Resource  `gorm:"foreignKey:ResourceID;constraint:OnDelete:CASCADE;" json:"resource"`
	ServiceID  uint      `gorm:"not null" json:"service_id"`
	Service    Service   `gorm:"foreignKey:ServiceID;constraint:OnDelete:CASCADE;" json:"service"`
	StartTime  time.Time `gorm:"not null" json:"start_time"`
	EndTime    time.Time `gorm:"not null" json:"end_time"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
