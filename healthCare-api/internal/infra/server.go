package infra

import (
	"net/http"

	"github.com/gabriel-hawerroth/HealthCare/internal/controllers"
)

// Load endpoints and start the web server
func StartServer() {
	mux := http.NewServeMux()

	controllers.LoadEndpoints(mux)

	http.ListenAndServe(":8080", mux)
}
