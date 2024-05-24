package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"github.com/gabriel-hawerroth/HealthCare/internal/services"
)

const loginEndpoint = "/login"

func LoadLoginEndpoints(db *sql.DB) {
	loginRepository := repository.NewLoginRepository(db)
	tokenRepository := repository.NewTokenRepository(db)
	userRepository := repository.NewUserRepository(db)

	loginService := services.NewLoginService(*loginRepository, *tokenRepository, *userRepository)
	loginController := NewLoginController(loginService)

	mux.HandleFunc(fmt.Sprintf("GET %s", loginEndpoint), loginController.DoLogin)
	mux.HandleFunc(fmt.Sprintf("PUT %s/send-activate-account-email", loginEndpoint), loginController.SendActivateAccountEmail)
	mux.HandleFunc(fmt.Sprintf("GET %s/activate-account/{userId}/{token}", loginEndpoint), loginController.ActivateAccount)
	mux.HandleFunc(fmt.Sprintf("PUT %s/send-change-password-email", loginEndpoint), loginController.SendChangePasswordEmail)
	mux.HandleFunc(fmt.Sprintf("GET %s/permit-change-password/{userId}/{token}", loginEndpoint), loginController.PermitChangePassword)
	mux.HandleFunc(fmt.Sprintf("PUT %s/change-password/{userId}", loginEndpoint), loginController.ChangePassword)
}

type LoginController struct {
	LoginService *services.LoginService
}

func NewLoginController(loginService *services.LoginService) *LoginController {
	return &LoginController{
		LoginService: loginService,
	}
}

func (c *LoginController) DoLogin(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	password := r.URL.Query().Get("password")

	res, err := c.LoginService.DoLogin(email, password)
	if err != nil {
		tokErr := "error generating token"
		if err.Error() == tokErr {
			http.Error(w, tokErr, http.StatusInternalServerError)
			return
		}

		http.Error(w, "bad credentials", http.StatusUnauthorized)
		return
	}

	// if *res.User.Situacao == "I" {
	// 	http.Error(w, "inactive user", http.StatusUnauthorized)
	// 	return
	// }

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func (c *LoginController) SendActivateAccountEmail(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting params", http.StatusBadRequest)
		return
	}

	err = c.LoginService.SendActivateAccountEmail(userId)
	if err != nil {
		errMsg := "Error sending activate account email"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Email successfully sended"))
}

func (c *LoginController) ActivateAccount(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.PathValue("userId"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	token := r.PathValue("token")

	err = c.LoginService.ActivateAccount(userId, token)
	if err != nil {
		errMsg := "Error activating user"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	redirectUrl := "https://hawetec.com.br/healthcare/ativacao-da-conta"
	http.Redirect(w, r, redirectUrl, http.StatusSeeOther)
}

func (c *LoginController) SendChangePasswordEmail(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	err = c.LoginService.SendChangePasswordEmail(userId)
	if err != nil {
		errMsg := "Error sending change password email"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Email successfully sended"))
}

func (c *LoginController) PermitChangePassword(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.PathValue("userId"))
	if err != nil {
		http.Error(w, "Error casting params", http.StatusBadRequest)
		return
	}

	token := r.PathValue("token")

	err = c.LoginService.PermitChangePassword(userId, token)
	if err != nil {
		errMsg := "Error allowing password change"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	redirectUrl := fmt.Sprintf("https://hawetec.com.br/healthcare/recuperacao-da-senha/%d", userId)
	// redirectUrl := fmt.Sprintf("http://localhost:4200/recuperacao-da-senha/%d", userId)
	http.Redirect(w, r, redirectUrl, http.StatusSeeOther)
}

func (c *LoginController) ChangePassword(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting params", http.StatusBadRequest)
		return
	}

	newPassword := r.URL.Query().Get("newPassword")

	err = c.LoginService.ChangePassword(userId, newPassword)
	if err != nil {
		errMsg := "Error changing password"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Password successfully changed"))
}
