package controllers

import (
	"fmt"
	"net/http"
)

var patientController string = "/patient"

func LoadPatientEndpoints() {
	GetPatientList()
	GetPatientById()
	InsertPatient()
	UpdatePatient()
	DeletePatient()
}

func GetPatientList() {
	mux.HandleFunc(fmt.Sprintf("GET %s", patientController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func GetPatientById() {
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", patientController), func(w http.ResponseWriter, r *http.Request) {
		patientId := r.PathValue("id")
		fmt.Println(patientId)
	})
}

func InsertPatient() {
	mux.HandleFunc(fmt.Sprintf("POST %s", patientController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func UpdatePatient() {
	mux.HandleFunc(fmt.Sprintf("PUT %s", patientController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func DeletePatient() {
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", patientController), func(w http.ResponseWriter, r *http.Request) {
		patientId := r.PathValue("id")
		fmt.Println(patientId)
	})
}
