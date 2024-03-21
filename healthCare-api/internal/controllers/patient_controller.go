package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"github.com/gabriel-hawerroth/HealthCare/internal/services"
)

var patientEndpoint string = "/patient"

func LoadPatientEndpoints(db *sql.DB) {
	repository := repository.NewPatientRepository(db)
	patientService := services.NewPatientService(*repository)
	patientControllers := NewPatientController(patientService)

	mux.HandleFunc(fmt.Sprintf("GET %s", patientEndpoint), patientControllers.GetPatientList)
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", patientEndpoint), patientControllers.GetPatientById)
	mux.HandleFunc(fmt.Sprintf("POST %s", patientEndpoint), patientControllers.SavePatient)
	mux.HandleFunc(fmt.Sprintf("PUT %s", patientEndpoint), patientControllers.UpdatePatient)
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
	var userId int
	_, err := fmt.Sscanf(r.URL.Query().Get("userId"), "%d", &userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	list, err := c.PatientService.GetPatientsList(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (c *PatientController) GetPatientById(w http.ResponseWriter, r *http.Request) {
	var userId int
	_, err := fmt.Sscanf(r.PathValue("id"), "%d", &userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	patient, err := c.PatientService.GetPatientById(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(patient)
}

func (c *PatientController) SavePatient(w http.ResponseWriter, r *http.Request) {
	var data entity.Patient

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Error decoding response body", http.StatusInternalServerError)
		return
	}

	patient, err := c.PatientService.SavePatient(data)
	if err != nil {
		http.Error(w, "Error saving patient", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(patient)
}

func (c *PatientController) UpdatePatient(w http.ResponseWriter, r *http.Request) {

}

func (c *PatientController) DeletePatient(w http.ResponseWriter, r *http.Request) {
	patientId := r.PathValue("id")
	fmt.Println(patientId)
}
