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

const attendanceEndpoint string = "/attendance"

func LoadAttendanceEndpoints(db *sql.DB) {
	repository := repository.NewAttendanceRepository(db)
	attendanceService := services.NewAttendanceService(*repository)
	attendanceControllers := NewAttendanceController(attendanceService)

	mux.HandleFunc(fmt.Sprintf("GET %s", attendanceEndpoint), attendanceControllers.GetAttendanceList)
	mux.HandleFunc(fmt.Sprintf("GET %s/{id}", attendanceEndpoint), attendanceControllers.GetAttendanceById)
	mux.HandleFunc(fmt.Sprintf("POST %s", attendanceEndpoint), attendanceControllers.SaveAttendance)
	mux.HandleFunc(fmt.Sprintf("DELETE %s/{id}", attendanceEndpoint), attendanceControllers.DeleteAttendance)
}

type AttendanceController struct {
	AttendanceService *services.AttendanceService
}

func NewAttendanceController(attendanceService *services.AttendanceService) *AttendanceController {
	return &AttendanceController{
		AttendanceService: attendanceService,
	}
}

func (c *AttendanceController) GetAttendanceList(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(r.URL.Query().Get("userId"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	list, err := c.AttendanceService.GetAttendanceList(userId)
	if err != nil {
		errMsg := "Error getting attendances list"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (c *AttendanceController) GetAttendanceById(w http.ResponseWriter, r *http.Request) {
	attendanceId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	attendance, err := c.AttendanceService.GetAttendanceById(attendanceId)
	if err != nil {
		errMsg := "Error getting attendance by id"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(attendance)
}

func (c *AttendanceController) SaveAttendance(w http.ResponseWriter, r *http.Request) {
	var data entity.Attendance
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Error decoding response body", http.StatusBadRequest)
		return
	}

	attendance, err := c.AttendanceService.SaveAttendance(data)
	if err != nil {
		errMsg := "Error saving attendance"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(attendance)
}

func (c *AttendanceController) DeleteAttendance(w http.ResponseWriter, r *http.Request) {
	attendanceId, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Error casting param", http.StatusBadRequest)
		return
	}

	err = c.AttendanceService.DeleteAttendance(attendanceId)
	if err != nil {
		errMsg := "Error deleting attendance"
		log.Printf("%s: %s", errMsg, err)
		http.Error(w, errMsg, http.StatusInternalServerError)
		return
	}
}
