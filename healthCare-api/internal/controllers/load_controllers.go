package controllers

import "net/http"

var mux *http.ServeMux

func LoadEndpoints(serverMux *http.ServeMux) {
	mux = serverMux
	LoadPatientEndpoints()
	LoadUnitEndpoints()
}
