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

const patientEndpoint string = "/patient"

func LoadPatientEndpoints(db *sql.DB) {
	repository := repository.NewPatientRepository(db)
	patientService := services.NewPatientService(*repository)
	patientControllers := NewPatientController(patientService)

	mux.HandleFunc(fmt.Sprintf("GET %s", patientEndpoint), patientControllers.GetPatientList)
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", patientEndpoint), patientControllers.GetPatientById)
	mux.HandleFunc(fmt.Sprintf("POST %s", patientEndpoint), patientControllers.SavePatient)
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", patientEndpoint), patientControllers.DeletePatient)
}

type PatientController struct {
	PatientService *services.PatientService
}

func NewPatientController(patientService *services.PatientService) *PatientController {
	return &PatientController{
		PatientService: patientService,
	}
}

func (c *PatientController) GetPatientList(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	list, err := c.PatientService.GetPatientsList(userId)
	if err != nil {
		errMsg := "Error getting patient list"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (c *PatientController) GetPatientById(w http.ResponseWriter, r *http.Request) {
	patientId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	patient, err := c.PatientService.GetPatientById(patientId)
	if err != nil {
		errMsg := "Error getting patient by id"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(patient)
}

func (c *PatientController) SavePatient(w http.ResponseWriter, r *http.Request) {
	var data entity.Patient
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Error decoding response body", http.StatusBadRequest)
		return
	}

	patient, err := c.PatientService.SavePatient(data)
	if err != nil {
		errMsg := "Error saving patient"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(patient)
}

func (c *PatientController) DeletePatient(w http.ResponseWriter, r *http.Request) {
	patientId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	err = c.PatientService.DeletePatient(patientId)
	if err != nil {
		errMsg := "Error deleting patient"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}
}
