package repository

import (
	"database/sql"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type PatientRepository struct {
	DB *sql.DB
}

func (r *PatientRepository) Save(patient entity.Patient) error {
	_, err := r.DB.Exec("INSERT INTO ...")
	if err != nil {
		return err
	}
	return nil
}
