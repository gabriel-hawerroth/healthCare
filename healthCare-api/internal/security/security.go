package security

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

var (
	secretKey   = []byte("secret-key")
	allowedUrls = []string{
		"/login/send-activate-account-email",
		"/login/send-change-password-email",
		"/login/permit-change-password",
		"/login/activate-account",
		"/login/change-password",
		"/login",
		"/user/get-by-email",
		"/user/new-user",
	}
)

type TokenClaims struct {
	UserID int `json:"user_id"`
	jwt.StandardClaims
}

func GenerateToken(userID int) (string, error) {
	claims := TokenClaims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour).Unix(), // Token válido por 1 hora
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

type LoginResponse struct {
	User  entity.User `json:"user"`
	Token string      `json:"token"`
}
