export interface User {
  id?: number;
  email: string;
  senha: string;
  nome: string;
  sobrenome?: string;
  acesso: string;
  situacao: string;
  canChangePassword: boolean;
}
