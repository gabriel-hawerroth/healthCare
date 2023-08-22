export interface User {
  id?: number;
  usuario: string;
  senha: string;
  nome: string;
  sobrenome?: string;
  acesso: string;
  permissao: boolean;
  primeiro_acesso: boolean;
  situacao: string;
}
