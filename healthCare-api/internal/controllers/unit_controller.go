package controllers

import (
	"fmt"
	"net/http"
)

var unitController string = "/unit"

func LoadUnitEndpoints() {
	GetUnitList()
	GetUnitById()
	InsertUnit()
	UpdateUnit()
}

func GetUnitList() {
	mux.HandleFunc(fmt.Sprintf("GET %s", unitController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func GetUnitById() {
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", unitController), func(w http.ResponseWriter, r *http.Request) {
		unitId := r.PathValue("id")
		fmt.Println(unitId)
	})
}

func InsertUnit() {
	mux.HandleFunc(fmt.Sprintf("POST %s", unitController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func UpdateUnit() {
	mux.HandleFunc(fmt.Sprintf("PUT %s", unitController), func(w http.ResponseWriter, r *http.Request) {

	})
}

func DeleteUnit() {
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", unitController), func(w http.ResponseWriter, r *http.Request) {
		unitId := r.PathValue("id")
		fmt.Println(unitId)
	})
}
