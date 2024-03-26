package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
)

var mux *http.ServeMux

func LoadEndpoints(serverMux *http.ServeMux, db *sql.DB) {
	mux = serverMux

	LoadPatientEndpoints(db)
	LoadUnitEndpoints(db)
	LoadAttendanceEndpoints(db)
	LoadUserEndpoints(db)
	LoadLoginEndpoints(db)

	repository.NewTokenRepository(db)
}

func SetJsonResponse(w *http.ResponseWriter) {
	var request = *w
	request.Header().Set("Content-type", "application/json")
}
