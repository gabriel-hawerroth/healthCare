package main

import (
	"github.com/gabriel-hawerroth/HealthCare/configs"
	"github.com/gabriel-hawerroth/HealthCare/internal/infra"
)

func main() {
	err := configs.Load()
	if err != nil {
		panic(err)
	}

	db, err := infra.OpenConnection()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	infra.StartServer()
}
