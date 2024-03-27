package infra

import (
	"database/sql"
	"net/http"

	"github.com/gabriel-hawerroth/HealthCare/internal/controllers"
	"github.com/gabriel-hawerroth/HealthCare/internal/security"
)

// StartServer load endpoints and start the web server
func StartServer(db *sql.DB) {
	mux := http.NewServeMux()

	controllers.LoadEndpoints(mux, db)

	handler := cors(security.AuthMiddleware(mux))

	err := http.ListenAndServe(":8088", handler)
	if err != nil {
		panic("Server failed to start")
	}
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method == "OPTIONS" {
			w.Header().Add("Access-Control-Allow-Credentials", "true")
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
