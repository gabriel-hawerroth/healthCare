import { User } from './user';

export interface Authentication {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
