package repository

import (
	"database/sql"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (r *UserRepository) GetList() ([]*entity.User, error) {
	rows, err := r.DB.Query("SELECT * from usuario ORDER BY id ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users = make([]*entity.User, 0)
	for rows.Next() {
		var user entity.User
		scanUsers(rows, &user)
		users = append(users, &user)
	}

	return users, err
}

func (r *UserRepository) GetById(id int) (*entity.User, error) {
	row := r.DB.QueryRow("SELECT * FROM usuario WHERE id = $1", id)

	var user entity.User
	err := scanUser(row, &user)

	return &user, err
}

func (r *UserRepository) GetByMail(email string) (*entity.User, error) {
	query := `SELECT * FROM usuario WHERE email = $1`
	row := r.DB.QueryRow(query, email)

	var user entity.User
	err := scanUser(row, &user)

	return &user, err
}

func (r *UserRepository) Insert(user entity.User) (*entity.User, error) {
	query := `
		INSERT INTO usuario (
			email, senha, nome, sobrenome,
			acesso, situacao, can_change_password
		) VALUES (
			$1, $2, $3, $4,
			$5, $6, $7
		)
	`

	_, err := r.DB.Exec(query,
		user.Email, user.Senha, user.Nome, user.Sobrenome,
		user.Acesso, user.Situacao, user.Can_change_password,
	)

	return &user, err
}

func (r *UserRepository) Update(data entity.User) (user *entity.User, err error) {
	query := `
		UPDATE usuario
		SET email = $2, nome = $3, sobrenome = $4,
			acesso = $5, situacao = $6, can_change_password = $7
		WHERE id = $1
	`

	_, err = r.DB.Exec(query, data.Id,
		data.Email, data.Nome, data.Sobrenome,
		data.Acesso, data.Situacao, data.Can_change_password,
	)

	user = &data

	return user, err
}

func (r *UserRepository) UpdatePassword(userId int, newPassword string) error {
	query := `
		UPDATE usuario
		SET senha = $2
		WHERE id = $1
	`

	_, err := r.DB.Exec(query, userId, newPassword)

	return err
}

func (r *UserRepository) Delete(userId int) error {
	query := "DELETE FROM usuario WHERE id = $1"

	_, err := r.DB.Exec(query, userId)

	return err
}

func scanUsers(rows *sql.Rows, unit *entity.User) error {
	return rows.Scan(
		&unit.Id,
		&unit.Email,
		&unit.Senha,
		&unit.Nome,
		&unit.Sobrenome,
		&unit.Acesso,
		&unit.Situacao,
		&unit.Can_change_password,
	)
}

func scanUser(row *sql.Row, unit *entity.User) error {
	return row.Scan(
		&unit.Id,
		&unit.Email,
		&unit.Senha,
		&unit.Nome,
		&unit.Sobrenome,
		&unit.Acesso,
		&unit.Situacao,
		&unit.Can_change_password,
	)
}
