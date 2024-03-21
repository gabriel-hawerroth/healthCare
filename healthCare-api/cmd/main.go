package main

import (
	"github.com/gabriel-hawerroth/HealthCare/internal/infra"
)

func main() {
	db, err := infra.OpenDBConnection()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	infra.StartServer(db)
}
