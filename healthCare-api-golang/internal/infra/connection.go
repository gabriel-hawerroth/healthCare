package infra

import (
	"database/sql"
	"os"

	_ "github.com/lib/pq"
)

// Open a connection with the database
func OpenDBConnection() (*sql.DB, error) {
	dbConn := os.Getenv("HEALTHCARE_DB")

	conn, err := sql.Open("postgres", dbConn)
	if err != nil {
		panic(err)
	}

	err = conn.Ping()

	return conn, err
}
