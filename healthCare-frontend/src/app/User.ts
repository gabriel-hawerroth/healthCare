export interface User {
  id?: number;
  nome: string;
  sobrenome?: string;
  email?: string;
  celular?: number;
  empresa?: string;
  permissao: boolean;
}
