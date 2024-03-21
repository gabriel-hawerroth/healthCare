package infra

import (
	"database/sql"
	"net/http"

	"github.com/gabriel-hawerroth/HealthCare/internal/controllers"
)

// Load endpoints and start the web server
func StartServer(db *sql.DB) {
	mux := http.NewServeMux()

	controllers.LoadEndpoints(mux, db)

	println("Server running")
	http.ListenAndServe(":8081", mux)
}
