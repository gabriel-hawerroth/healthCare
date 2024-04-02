package services

import (
	"log"
	"time"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
)

type PatientService struct {
	PatientRepository repository.PatientRepository
}

func NewPatientService(patientRepository repository.PatientRepository) *PatientService {
	return &PatientService{PatientRepository: patientRepository}
}

func (s *PatientService) GetPatientsList(userId int) ([]*entity.Patient, error) {
	patients, err := s.PatientRepository.GetPatientList(userId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return patients, nil
}

func (s *PatientService) GetPatientById(patientId int) (*entity.Patient, error) {
	patient, err := s.PatientRepository.GetPatientById(patientId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return patient, nil
}

func (s *PatientService) SavePatient(data entity.Patient) (patient *entity.Patient, err error) {
	if data.Id == nil {
		currentTime := time.Now()
		data.Dt_criacao = &currentTime
		patient, err = s.PatientRepository.InsertPatient(data)
	} else {
		patient, err = s.PatientRepository.UpdatePatient(data)
	}

	if err != nil {
		return nil, err
	}

	return patient, err
}

func (s *PatientService) DeletePatient(patientId int) error {
	return s.PatientRepository.DeletePatient(patientId)
}
