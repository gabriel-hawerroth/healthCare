package repository

import "database/sql"

type LoginRepository struct {
	DB *sql.DB
}

func NewLoginRepository(db *sql.DB) *LoginRepository {
	return &LoginRepository{DB: db}
}
