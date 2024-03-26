package repository

import (
	"database/sql"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type TokenRepository struct {
	DB *sql.DB
}

func NewTokenRepository(db *sql.DB) *TokenRepository {
	return &TokenRepository{DB: db}
}

func (r *TokenRepository) GetByUserId(userId int) (*entity.Token, error) {
	row := r.DB.QueryRow("SELECT * FROM token WHERE user_id = $1 LIMIT 1", userId)

	var token entity.Token
	err := scanToken(row, &token)

	return &token, err
}

func (r *TokenRepository) Insert(data entity.Token) (*entity.Token, error) {
	query := `
		INSERT INTO token (
			user_id, token
		) VALUES (
			$1, $2
		)
	`

	_, err := r.DB.Exec(query,
		data.User_id, data.Token,
	)

	return &data, err
}

func (r *TokenRepository) Update(data entity.Token) (*entity.Token, error) {
	query := `
		UPDATE token
		SET	token = $2
		WHERE id = $1
		RETURNING *
	`

	_, err := r.DB.Exec(query, data.Id, data.Token)

	return &data, err
}

func scanToken(row *sql.Row, token *entity.Token) error {
	return row.Scan(
		&token.Id,
		&token.User_id,
		&token.Token,
	)
}
