package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"github.com/gabriel-hawerroth/HealthCare/internal/services"
)

const userEndpoint = "/user"

func LoadUserEndpoints(db *sql.DB) {
	repository := repository.NewUserRepository(db)
	userService := services.NewUserService(*repository)
	userControllers := NewUserController(userService)

	mux.HandleFunc(fmt.Sprintf("GET %s", userEndpoint), userControllers.GetUsersList)
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", userEndpoint), userControllers.GetUserById)
	mux.HandleFunc(fmt.Sprintf("GET %s/get-by-email", userEndpoint), userControllers.GetUserByMail)
	mux.HandleFunc(fmt.Sprintf("POST %s", userEndpoint), userControllers.SaveUser)
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", userEndpoint), userControllers.DeleteUser)
}

type UserController struct {
	UserService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{
		UserService: userService,
	}
}

func (c *UserController) GetUsersList(w http.ResponseWriter, r *http.Request) {
	list, err := c.UserService.GetUsersList()
	if err != nil {
		errMsg := "Error getting users list"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (c *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	user, err := c.UserService.GetUserById(userId)
	if err != nil {
		errMsg := "Error getting user"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (c *UserController) GetUserByMail(w http.ResponseWriter, r *http.Request) {
	userMail := r.URL.Query().Get("email")

	user, err := c.UserService.GetUserByMail(userMail)
	if err != nil {
		errMsg := "Error getting user by mail"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (c *UserController) SaveUser(w http.ResponseWriter, r *http.Request) {
	var data entity.User
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Error decoding response body", http.StatusBadRequest)
		return
	}

	user, err := c.UserService.SaveUser(data)
	if err != nil {
		errMsg := "Error saving user"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (c *UserController) DeleteUser(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	err = c.UserService.DeleteUser(userId)
	if err != nil {
		errMsg := "Error deleting user"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}
}
