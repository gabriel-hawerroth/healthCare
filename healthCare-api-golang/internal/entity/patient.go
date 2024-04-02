package entity

import "time"

type Patient struct {
	Id                   *int       `json:"id"`
	Ds_nome              *string    `json:"ds_nome"`
	Nr_cpf               *string    `json:"nr_cpf"`
	Dt_nascimento        *string    `json:"dt_nascimento"` //time.Time
	Nr_celular           *string    `json:"nr_celular"`
	Status               *string    `json:"status"`
	Nome_mae             *string    `json:"nome_mae"`
	Nome_pai             *string    `json:"nome_pai"`
	Genero               *string    `json:"genero"`
	Estado_civil         *string    `json:"estado_civil"`
	Nacionalidade        *string    `json:"nacionalidade"`
	Etnia                *string    `json:"etnia"`
	Religiao             *string    `json:"religiao"`
	Peso_kg              *int       `json:"peso_kg"`
	Altura_cm            *int       `json:"altura_cm"`
	Email                *string    `json:"email"`
	Alergias             *string    `json:"alergias"`
	Dependencia          *string    `json:"dependencia"`
	Permite_atend_online *bool      `json:"permite_atend_online"`
	Obs_diagnostico      *string    `json:"obs_diagnostico"`
	Dt_inicio_atend      *string    `json:"dt_inicio_atend"` //time.Time
	Dt_fim_atend         *string    `json:"dt_fim_atend"`    //time.Time
	Estoque_empenhado    *bool      `json:"estoque_empenhado"`
	Guarda_compartilhada *bool      `json:"guarda_compartilhada"`
	Genero_pref          *string    `json:"genero_pref"`
	Idade_min            *int       `json:"idade_min"`
	Idade_max            *int       `json:"idade_max"`
	Obs_preferencias     *string    `json:"obs_preferencias"`
	Nr_cep               *string    `json:"nr_cep"`
	Estado               *string    `json:"estado"`
	Cidade               *string    `json:"cidade"`
	Bairro               *string    `json:"bairro"`
	Endereco             *string    `json:"endereco"`
	Nr_endereco          *int       `json:"nr_endereco"`
	Complemento          *string    `json:"complemento"`
	Como_chegar          *string    `json:"como_chegar"`
	Ie_situacao          *string    `json:"ie_situacao"`
	Dt_criacao           *time.Time `json:"dt_criacao"`
	User_id              *int       `json:"user_id"`
}
