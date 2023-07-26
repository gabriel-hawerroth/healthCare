export interface Atendimento {
  id?: number;
  dt_atendimento: string;
  hora_inicio?: string;
  hora_fim?: string;
  id_paciente: number;
  id_unidade: number;
  medico_responsavel?: string;
  especialidade?: string;
  tipo_atendimento?: string;
  valor_atendimento?: string;
  convenio?: string;
  nr_carteirinha_convenio?: string;
  status_atend: string;
}
