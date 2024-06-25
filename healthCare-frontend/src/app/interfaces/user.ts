export interface User {
  id?: number;
  email: string;
  senha: string;
  nome: string;
  sobrenome?: string;
  acesso: string;
  situacao: string;
  can_change_password: boolean;
}
