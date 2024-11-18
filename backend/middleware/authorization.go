package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func RoleAuthorization(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("userRole") // Obtenemos el rol del contexto
		log.WithFields(log.Fields{
			"role":   role,
			"exists": exists,
		}).Info("userRole")
		if !exists || role != requiredRole {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}
		c.Next() // El usuario tiene el rol requerido, continuamos
	}
}
