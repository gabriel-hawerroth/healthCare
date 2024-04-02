package services

import (
	"log"
	"time"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
	"github.com/gabriel-hawerroth/HealthCare/internal/repository"
)

type UnitService struct {
	UnitRepository repository.UnitRepository
}

func NewUnitService(unitRepository repository.UnitRepository) *UnitService {
	return &UnitService{UnitRepository: unitRepository}
}

func (s *UnitService) GetUnitsList(userId int) ([]*entity.Unit, error) {
	units, err := s.UnitRepository.GetListByUser(userId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return units, nil
}

func (s *UnitService) GetUnitById(unitId int) (*entity.Unit, error) {
	unit, err := s.UnitRepository.GetById(unitId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}

	return unit, nil
}

func (s *UnitService) SaveUnit(data entity.Unit) (unit *entity.Unit, err error) {
	if data.Id == nil {
		currentTime := time.Now()
		data.Dt_criacao = &currentTime
		unit, err = s.UnitRepository.Insert(data)
	} else {
		unit, err = s.UnitRepository.Update(data)
	}

	return unit, err
}

func (s *UnitService) DeleteUnit(unitId int) error {
	return s.UnitRepository.Delete(unitId)
}
