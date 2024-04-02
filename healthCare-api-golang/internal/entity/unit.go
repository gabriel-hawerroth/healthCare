package entity

import "time"

type Unit struct {
	Id                        *int       `json:"id"`
	Ds_nome                   *string    `json:"ds_nome"`
	Cnpj                      *string    `json:"cnpj"`
	Nr_telefone               *string    `json:"nr_telefone"`
	Email                     *string    `json:"email"`
	Nr_cep                    *string    `json:"nr_cep"`
	Estado                    *string    `json:"estado"`
	Cidade                    *string    `json:"cidade"`
	Bairro                    *string    `json:"bairro"`
	Endereco                  *string    `json:"endereco"`
	Nr_endereco               *int       `json:"nr_endereco"`
	Complemento               *string    `json:"complemento"`
	Como_chegar               *string    `json:"como_chegar"`
	Capacidade_atendimento    *int       `json:"capacidade_atendimento"`
	Horario_funcionamento     *string    `json:"horario_funcionamento"`
	Especialidades_oferecidas *string    `json:"especialidades_oferecidas"`
	Tipo                      *string    `json:"tipo"`
	Ie_situacao               *string    `json:"ie_situacao"`
	Dt_criacao                *time.Time `json:"dt_criacao"`
	User_id                   *int       `json:"user_id"`
}
