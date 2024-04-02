package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
	"github.com/gabriel-hawerroth/HealthCare/internal/services"
)

const unitEndpoint string = "/unit"

func LoadUnitEndpoints(db *sql.DB) {
	repository := repository.NewUnitRepository(db)
	unitService := services.NewUnitService(*repository)
	unitControllers := NewUnitController(unitService)

	mux.HandleFunc(fmt.Sprintf("GET %s", unitEndpoint), unitControllers.GetUnitList)
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", unitEndpoint), unitControllers.GetUnitById)
	mux.HandleFunc(fmt.Sprintf("POST %s", unitEndpoint), unitControllers.SaveUnit)
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", unitEndpoint), unitControllers.DeleteUnit)
}

type UnitController struct {
	UnitService *services.UnitService
}

func NewUnitController(unitService *services.UnitService) *UnitController {
	return &UnitController{
		UnitService: unitService,
	}
}

func (c *UnitController) GetUnitList(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	list, err := c.UnitService.GetUnitsList(userId)
	if err != nil {
		errMsg := "Error getting units list"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (c *UnitController) GetUnitById(w http.ResponseWriter, r *http.Request) {
	unitId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	unit, err := c.UnitService.GetUnitById(unitId)
	if err != nil {
		errMsg := "Error getting unit by id"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(unit)
}

func (c *UnitController) SaveUnit(w http.ResponseWriter, r *http.Request) {
	var data entity.Unit
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Error decoding response body", http.StatusBadRequest)
		return
	}

	unit, err := c.UnitService.SaveUnit(data)
	if err != nil {
		errMsg := "Error saving unit"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(unit)
}

func (c *UnitController) DeleteUnit(w http.ResponseWriter, r *http.Request) {
	unitId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	err = c.UnitService.DeleteUnit(unitId)
	if err != nil {
		errMsg := "Error deleting unit"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}
}
