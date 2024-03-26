package repository

import (
	"database/sql"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type AttendanceRepository struct {
	DB *sql.DB
}

func NewAttendanceRepository(db *sql.DB) *AttendanceRepository {
	return &AttendanceRepository{DB: db}
}

func (r *AttendanceRepository) GetListByUser(userId int) ([]*entity.AttendancePerson, error) {
	query := `
		SELECT
			a.id,
			p.ds_nome ds_paciente,
			u.ds_nome ds_unidade,
			a.dt_atendimento,
			a.status_atend,
			a.medico_responsavel,
			a.hora_inicio,
			a.hora_fim,
			a.especialidade,
			a.tipo_atendimento,
			a.valor_atendimento,
			a.forma_pagamento,
			a.convenio,
			a.nr_carteirinha_convenio,
			a.dt_criacao,
			a.user_id
		FROM
			atendimento a
			JOIN paciente p ON a.id_paciente = p.id
			JOIN unidade u ON a.id_unidade = u.id
		WHERE
			a.user_id = $1
		ORDER BY
			a.id ASC
	`

	rows, err := r.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendances = make([]*entity.AttendancePerson, 0)
	for rows.Next() {
		var attendance entity.AttendancePerson
		scanAttendances(rows, &attendance)
		attendances = append(attendances, &attendance)
	}

	return attendances, err
}

func (r *AttendanceRepository) GetById(id int) (*entity.Attendance, error) {
	row := r.DB.QueryRow("SELECT * FROM atendimento WHERE id = $1", id)

	var attendance entity.Attendance
	err := scanAttendance(row, &attendance)

	return &attendance, err
}

func (r *AttendanceRepository) Insert(attendance entity.Attendance) (*entity.Attendance, error) {
	query := `
		INSERT INTO atendimento (
			dt_atendimento, hora_inicio, hora_fim, id_paciente, id_unidade,
			medico_responsavel, especialidade, tipo_atendimento, valor_atendimento,
			convenio, nr_carteirinha_convenio, status_atend, forma_pagamento,
			dt_criacao, user_id
		) VALUES (
			$1, $2, $3, $4, $5,
			$6, $7, $8, $9,
			$10, $11, $12, $13,
			$14, $15
		)
	`

	_, err := r.DB.Exec(query,
		attendance.Dt_atendimento, attendance.Hora_inicio, attendance.Hora_fim,
		attendance.Id_paciente, attendance.Id_unidade, attendance.Medico_responsavel,
		attendance.Especialidade, attendance.Tipo_atendimento, attendance.Valor_atendimento,
		attendance.Convenio, attendance.Nr_carteirinha_convenio, attendance.Status_atend,
		attendance.Forma_pagamento, attendance.Dt_criacao, attendance.User_id,
	)
	if err != nil {
		return nil, err
	}

	return &attendance, nil
}

func (r *AttendanceRepository) Update(attendance entity.Attendance) (*entity.Attendance, error) {
	query := `
		UPDATE atendimento
		SET dt_atendimento = $2, hora_inicio = $3, hora_fim = $4, id_paciente = $5, id_unidade = $6,
			medico_responsavel = $7, especialidade = $8, tipo_atendimento = $9, valor_atendimento = $10,
			convenio = $11, nr_carteirinha_convenio = $12, status_atend = $13, forma_pagamento = $14
		WHERE id = $1
		RETURNING *
	`

	_, err := r.DB.Exec(query, attendance.Id,
		attendance.Dt_atendimento, attendance.Hora_inicio, attendance.Hora_fim,
		attendance.Id_paciente, attendance.Id_unidade, attendance.Medico_responsavel,
		attendance.Especialidade, attendance.Tipo_atendimento, attendance.Valor_atendimento,
		attendance.Convenio, attendance.Nr_carteirinha_convenio, attendance.Status_atend,
		attendance.Forma_pagamento,
	)
	if err != nil {
		return nil, err
	}

	return &attendance, nil
}

func (r *AttendanceRepository) Delete(attendanceId int) error {
	query := "DELETE FROM atendimento WHERE id = $1"

	_, err := r.DB.Exec(query, attendanceId)
	if err != nil {
		return err
	}

	return nil
}

func scanAttendances(rows *sql.Rows, attendance *entity.AttendancePerson) error {
	return rows.Scan(
		&attendance.Id,
		&attendance.Ds_paciente,
		&attendance.Ds_unidade,
		&attendance.Dt_atendimento,
		&attendance.Status_atend,
		&attendance.Medico_responsavel,
		&attendance.Hora_inicio,
		&attendance.Hora_fim,
		&attendance.Especialidade,
		&attendance.Tipo_atendimento,
		&attendance.Valor_atendimento,
		&attendance.Forma_pagamento,
		&attendance.Convenio,
		&attendance.Nr_carteirinha_convenio,
		&attendance.Dt_criacao,
		&attendance.User_id,
	)
}

func scanAttendance(row *sql.Row, attendance *entity.Attendance) error {
	return row.Scan(
		&attendance.Id,
		&attendance.Dt_atendimento,
		&attendance.Hora_inicio,
		&attendance.Hora_fim,
		&attendance.Id_paciente,
		&attendance.Id_unidade,
		&attendance.Medico_responsavel,
		&attendance.Especialidade,
		&attendance.Tipo_atendimento,
		&attendance.Valor_atendimento,
		&attendance.Convenio,
		&attendance.Nr_carteirinha_convenio,
		&attendance.Status_atend,
		&attendance.Forma_pagamento,
		&attendance.Dt_criacao,
		&attendance.User_id,
	)
}
