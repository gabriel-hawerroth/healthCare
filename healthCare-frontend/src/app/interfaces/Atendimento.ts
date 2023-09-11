export interface Atendimento {
  id?: number;
  id_paciente: number;
  id_unidade: number;
  dt_atendimento: string;
  status_atend: string;
  medico_responsavel?: string;
  hora_inicio?: string;
  hora_fim?: string;
  especialidade?: string;
  tipo_atendimento?: string;
  valor_atendimento?: number;
  forma_pagamento?: string;
  convenio?: string;
  nr_carteirinha_convenio?: string;
  dt_criacao: Date;
  userId: number;
}
