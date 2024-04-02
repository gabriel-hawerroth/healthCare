package entity

import "time"

type Attendance struct {
	Id                      *int       `json:"id"`
	Dt_atendimento          *time.Time `json:"dt_atendimento"`
	Hora_inicio             *string    `json:"hora_inicio"`
	Hora_fim                *string    `json:"hora_fim"`
	Id_paciente             *int       `json:"id_paciente"`
	Id_unidade              *int       `json:"id_unidade"`
	Medico_responsavel      *string    `json:"medico_responsavel"`
	Especialidade           *string    `json:"especialidade"`
	Tipo_atendimento        *string    `json:"tipo_atendimento"`
	Valor_atendimento       *int       `json:"valor_atendimento"`
	Convenio                *string    `json:"convenio"`
	Nr_carteirinha_convenio *string    `json:"nr_carteirinha_convenio"`
	Status_atend            *string    `json:"status_atend"`
	Forma_pagamento         *string    `json:"forma_pagamento"`
	Dt_criacao              *time.Time `json:"dt_criacao"`
	User_id                 *int       `json:"user_id"`
}

type AttendancePerson struct {
	Id                      *int       `json:"id"`
	Ds_paciente             *string    `json:"ds_paciente"`
	Ds_unidade              *string    `json:"ds_unidade"`
	Dt_atendimento          *time.Time `json:"dt_atendimento"`
	Status_atend            *string    `json:"status_atend"`
	Medico_responsavel      *string    `json:"medico_responsavel"`
	Hora_inicio             *string    `json:"hora_inicio"`
	Hora_fim                *string    `json:"hora_fim"`
	Especialidade           *string    `json:"especialidade"`
	Tipo_atendimento        *string    `json:"tipo_atendimento"`
	Valor_atendimento       *int       `json:"valor_atendimento"`
	Forma_pagamento         *string    `json:"forma_pagamento"`
	Convenio                *string    `json:"convenio"`
	Nr_carteirinha_convenio *int       `json:"nr_carteirinha_convenio"`
	Dt_criacao              *time.Time `json:"dt_criacao"`
	User_id                 *int       `json:"user_id"`
}
