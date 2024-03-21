package controllers

import (
	"database/sql"
	"net/http"
)

var mux *http.ServeMux

func LoadEndpoints(serverMux *http.ServeMux, db *sql.DB) {
	mux = serverMux
	LoadPatientEndpoints(db)
	LoadUnitEndpoints()
}
