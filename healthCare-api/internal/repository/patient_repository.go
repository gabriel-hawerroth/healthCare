package repository

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gabriel-hawerroth/HealthCare/internal/entity"
)

type PatientRepository struct {
	DB *sql.DB
}

func NewPatientRepository(db *sql.DB) *PatientRepository {
	return &PatientRepository{DB: db}
}

func (r *PatientRepository) GetPatientList(userId int) ([]*entity.Patient, error) {
	rows, err := r.DB.Query("SELECT * from paciente WHERE user_id = $1 ORDER BY id ASC", userId)
	if err != nil {
		log.Printf("Erro: %s", err)
		return nil, err
	}
	defer rows.Close()

	var patients = make([]*entity.Patient, 0)
	for rows.Next() {
		var patient entity.Patient
		scanPatients(rows, &patient)
		patients = append(patients, &patient)
	}

	return patients, err
}

func (r *PatientRepository) GetPatientById(id int) (*entity.Patient, error) {
	row := r.DB.QueryRow("SELECT * FROM paciente WHERE id = $1", id)

	var patient entity.Patient
	err := scanPatient(row, &patient)

	return &patient, err
}

func (r *PatientRepository) InsertPatient(patient entity.Patient) (*entity.Patient, error) {
	query := `
		INSERT INTO paciente (
			ds_nome, nr_cpf, dt_nascimento, nr_celular, status, nome_mae, nome_pai, genero, estado_civil,
			nacionalidade, etnia, religiao, peso_kg, altura_cm, email, alergias, dependencia,
			permite_atend_online, obs_diagnostico, dt_inicio_atend, dt_fim_atend, estoque_empenhado,
			guarda_compartilhada, genero_pref, idade_min, idade_max, obs_preferencias, nr_cep,
			estado, cidade, bairro, endereco, nr_endereco, complemento, como_chegar, ie_situacao,
			dt_criacao, user_id
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
			$22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38
		)
	`

	result, err := r.DB.Exec(query,
		patient.Ds_nome, patient.Nr_cpf, patient.Dt_nascimento, patient.Nr_celular, patient.Status, patient.Nome_mae,
		patient.Nome_pai, patient.Genero, patient.Estado_civil, patient.Nacionalidade, patient.Etnia, patient.Religiao,
		patient.Peso_kg, patient.Altura_cm, patient.Email, patient.Alergias, patient.Dependencia, patient.Permite_atend_online,
		patient.Obs_diagnostico, patient.Dt_inicio_atend, patient.Dt_fim_atend, patient.Estoque_empenhado, patient.Guarda_compartilhada,
		patient.Genero_pref, patient.Idade_min, patient.Idade_max, patient.Obs_preferencias, patient.Nr_cep, patient.Estado,
		patient.Cidade, patient.Bairro, patient.Endereco, patient.Nr_endereco, patient.Complemento, patient.Como_chegar,
		patient.Ie_situacao, patient.Dt_criacao, patient.User_id,
	)
	fmt.Printf("RESULT: %s", result)
	if err != nil {
		log.Printf("Error inserting patient: %s", err)
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	patient.Id = &id

	return &patient, nil
}

func (r *PatientRepository) UpdatePatient(patient entity.Patient) (*entity.Patient, error) {
	query := `
		UPDATE paciente
		SET ds_nome = $1, nr_cpf = $2, dt_nascimento = $3,
			nr_celular = $4, status = $5, nome_mae = $6,
			nome_pai = $7, genero = $8, estado_civil = $9,
			nacionalidade = $10, etnia = $11, religiao = $12,
			peso_kg = $13, altura_cm = $14, email = $15,
			alergias = $16, dependencia = $17,
			permite_atend_online = $18, obs_diagnostico = $19,
			dt_inicio_atend = $20, dt_fim_atend = $21,
			estoque_empenhado = $22, guarda_compartilhada = $23,
			genero_pref = $24, idade_min = $25, idade_max = $26,
			obs_preferencias = $27, nr_cep = $28, estado = $29,
			cidade = $30, bairro = $31, endereco = $32,
			nr_endereco = $33, complemento = $34, como_chegar = $35,
			ie_situacao = $36, dt_criacao = $37, user_id = $38
		RETURNING *
	`

	result, err := r.DB.Exec(query,
		patient.Ds_nome, patient.Nr_cpf, patient.Dt_nascimento, patient.Nr_celular, patient.Status, patient.Nome_mae,
		patient.Nome_pai, patient.Genero, patient.Estado_civil, patient.Nacionalidade, patient.Etnia, patient.Religiao,
		patient.Peso_kg, patient.Altura_cm, patient.Email, patient.Alergias, patient.Dependencia, patient.Permite_atend_online,
		patient.Obs_diagnostico, patient.Dt_inicio_atend, patient.Dt_fim_atend, patient.Estoque_empenhado, patient.Guarda_compartilhada,
		patient.Genero_pref, patient.Idade_min, patient.Idade_max, patient.Obs_preferencias, patient.Nr_cep, patient.Estado,
		patient.Cidade, patient.Bairro, patient.Endereco, patient.Nr_endereco, patient.Complemento, patient.Como_chegar,
		patient.Ie_situacao, patient.Dt_criacao, patient.User_id,
	)
	fmt.Printf("RESULT: %s", result)
	if err != nil {
		log.Printf("Error updating patient: %s", err)
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	patient.Id = &id

	return &patient, nil
}

func scanPatients(rows *sql.Rows, patient *entity.Patient) error {
	return rows.Scan(
		&patient.Id,
		&patient.Ds_nome,
		&patient.Nr_cpf,
		&patient.Dt_nascimento,
		&patient.Nr_celular,
		&patient.Status,
		&patient.Nome_mae,
		&patient.Nome_pai,
		&patient.Genero,
		&patient.Estado_civil,
		&patient.Nacionalidade,
		&patient.Etnia,
		&patient.Religiao,
		&patient.Peso_kg,
		&patient.Altura_cm,
		&patient.Email,
		&patient.Alergias,
		&patient.Dependencia,
		&patient.Permite_atend_online,
		&patient.Obs_diagnostico,
		&patient.Dt_inicio_atend,
		&patient.Dt_fim_atend,
		&patient.Estoque_empenhado,
		&patient.Guarda_compartilhada,
		&patient.Genero_pref,
		&patient.Idade_min,
		&patient.Idade_max,
		&patient.Obs_preferencias,
		&patient.Nr_cep,
		&patient.Estado,
		&patient.Cidade,
		&patient.Bairro,
		&patient.Endereco,
		&patient.Nr_endereco,
		&patient.Complemento,
		&patient.Como_chegar,
		&patient.Ie_situacao,
		&patient.Dt_criacao,
		&patient.User_id,
	)
}

func scanPatient(row *sql.Row, patient *entity.Patient) error {
	return row.Scan(
		&patient.Id,
		&patient.Ds_nome,
		&patient.Nr_cpf,
		&patient.Dt_nascimento,
		&patient.Nr_celular,
		&patient.Status,
		&patient.Nome_mae,
		&patient.Nome_pai,
		&patient.Genero,
		&patient.Estado_civil,
		&patient.Nacionalidade,
		&patient.Etnia,
		&patient.Religiao,
		&patient.Peso_kg,
		&patient.Altura_cm,
		&patient.Email,
		&patient.Alergias,
		&patient.Dependencia,
		&patient.Permite_atend_online,
		&patient.Obs_diagnostico,
		&patient.Dt_inicio_atend,
		&patient.Dt_fim_atend,
		&patient.Estoque_empenhado,
		&patient.Guarda_compartilhada,
		&patient.Genero_pref,
		&patient.Idade_min,
		&patient.Idade_max,
		&patient.Obs_preferencias,
		&patient.Nr_cep,
		&patient.Estado,
		&patient.Cidade,
		&patient.Bairro,
		&patient.Endereco,
		&patient.Nr_endereco,
		&patient.Complemento,
		&patient.Como_chegar,
		&patient.Ie_situacao,
		&patient.Dt_criacao,
		&patient.User_id,
	)
}
