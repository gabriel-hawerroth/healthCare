package services

import (
	"log"
	"time"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
)

type AttendanceService struct {
	AttendanceRepository repository.AttendanceRepository
}

func NewAttendanceService(attendanceRepository repository.AttendanceRepository) *AttendanceService {
	return &AttendanceService{AttendanceRepository: attendanceRepository}
}

func (s *AttendanceService) GetAttendanceList(userId int) ([]*entity.AttendancePerson, error) {
	attendances, err := s.AttendanceRepository.GetListByUser(userId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return attendances, nil
}

func (s *AttendanceService) GetAttendanceById(attendanceId int) (*entity.Attendance, error) {
	attendance, err := s.AttendanceRepository.GetById(attendanceId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return attendance, nil
}

func (s *AttendanceService) SaveAttendance(data entity.Attendance) (attendance *entity.Attendance, err error) {
	if data.Id == nil {
		currentTime := time.Now()
		data.Dt_criacao = &currentTime
		attendance, err = s.AttendanceRepository.Insert(data)
	} else {
		attendance, err = s.AttendanceRepository.Update(data)
	}

	return attendance, err
}

func (s *AttendanceService) DeleteAttendance(attendanceId int) error {
	return s.AttendanceRepository.Delete(attendanceId)
}
