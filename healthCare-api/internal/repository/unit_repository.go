package repository

import (
	"database/sql"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type UnitRepository struct {
	DB *sql.DB
}

func NewUnitRepository(db *sql.DB) *UnitRepository {
	return &UnitRepository{DB: db}
}

func (r *UnitRepository) GetListByUser(userId int) ([]*entity.Unit, error) {
	rows, err := r.DB.Query("SELECT * from unidade WHERE user_id = $1 ORDER BY id ASC", userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var units = make([]*entity.Unit, 0)
	for rows.Next() {
		var unit entity.Unit
		scanUnits(rows, &unit)
		units = append(units, &unit)
	}

	return units, err
}

func (r *UnitRepository) GetById(id int) (*entity.Unit, error) {
	row := r.DB.QueryRow("SELECT * FROM unidade WHERE id = $1", id)

	var unit entity.Unit
	err := scanUnit(row, &unit)

	return &unit, err
}

func (r *UnitRepository) Insert(unit entity.Unit) (*entity.Unit, error) {
	query := `
		INSERT INTO unidade (
			ds_nome, cnpj, nr_telefone, email, nr_cep, estado, cidade, bairro,
			endereco, nr_endereco, complemento, como_chegar, capacidade_atendimento,
			horario_funcionamento, especialidades_oferecidas, tipo,
			ie_situacao, dt_criacao, user_id
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8,
			$9, $10, $11, $12, $13,
			$14, $15, $16,
			$17, $18, $19
		)
	`

	_, err := r.DB.Exec(query,
		unit.Ds_nome, unit.Cnpj, unit.Nr_telefone, unit.Email, unit.Nr_cep, unit.Estado,
		unit.Cidade, unit.Bairro, unit.Endereco, unit.Nr_endereco, unit.Complemento, unit.Como_chegar,
		unit.Capacidade_atendimento, unit.Horario_funcionamento, unit.Especialidades_oferecidas,
		unit.Tipo, unit.Ie_situacao, unit.Dt_criacao, unit.User_id,
	)

	return &unit, err
}

func (r *UnitRepository) Update(unit entity.Unit) (*entity.Unit, error) {
	query := `
		UPDATE unidade
		SET ds_nome = $2, cnpj = $3, nr_telefone = $4, email = $5, nr_cep = $6,
			estado = $7, cidade = $8, bairro = $9, endereco = $10, nr_endereco = $11,
			complemento = $12, como_chegar = $13, capacidade_atendimento = $14,
			horario_funcionamento = $15, especialidades_oferecidas = $16, tipo = $17,
			ie_situacao = $18
		WHERE id = $1
		RETURNING *
	`

	_, err := r.DB.Exec(query, unit.Id,
		unit.Ds_nome, unit.Cnpj, unit.Nr_telefone, unit.Email, unit.Nr_cep,
		unit.Estado, unit.Cidade, unit.Bairro, unit.Endereco, unit.Nr_endereco,
		unit.Complemento, unit.Como_chegar, unit.Capacidade_atendimento,
		unit.Horario_funcionamento, unit.Especialidades_oferecidas, unit.Tipo,
		unit.Ie_situacao,
	)

	return &unit, err
}

func (r *UnitRepository) Delete(unitId int) error {
	query := "DELETE FROM unidade WHERE id = $1"

	_, err := r.DB.Exec(query, unitId)

	return err
}

func scanUnits(rows *sql.Rows, unit *entity.Unit) error {
	return rows.Scan(
		&unit.Id,
		&unit.Ds_nome,
		&unit.Cnpj,
		&unit.Nr_telefone,
		&unit.Email,
		&unit.Nr_cep,
		&unit.Estado,
		&unit.Cidade,
		&unit.Bairro,
		&unit.Endereco,
		&unit.Nr_endereco,
		&unit.Complemento,
		&unit.Como_chegar,
		&unit.Capacidade_atendimento,
		&unit.Horario_funcionamento,
		&unit.Especialidades_oferecidas,
		&unit.Tipo,
		&unit.Ie_situacao,
		&unit.Dt_criacao,
		&unit.User_id,
	)
}

func scanUnit(row *sql.Row, unit *entity.Unit) error {
	return row.Scan(
		&unit.Id,
		&unit.Ds_nome,
		&unit.Cnpj,
		&unit.Nr_telefone,
		&unit.Email,
		&unit.Nr_cep,
		&unit.Estado,
		&unit.Cidade,
		&unit.Bairro,
		&unit.Endereco,
		&unit.Nr_endereco,
		&unit.Complemento,
		&unit.Como_chegar,
		&unit.Capacidade_atendimento,
		&unit.Horario_funcionamento,
		&unit.Especialidades_oferecidas,
		&unit.Tipo,
		&unit.Ie_situacao,
		&unit.Dt_criacao,
		&unit.User_id,
	)
}
