package infra

import (
	"database/sql"
	"fmt"

	"github.com/gabriel-hawerroth/HealthCare/configs"
	_ "github.com/lib/pq"
)

// Open a connection with the database
func OpenConnection() (*sql.DB, error) {
	conf := configs.GetDB()

	sc := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s",
		conf.Host, conf.Port, conf.User, conf.Pass, conf.Database)

	conn, err := sql.Open("postgres", sc)

	if err != nil {
		panic(err)
	}

	err = conn.Ping()

	return conn, err
}
