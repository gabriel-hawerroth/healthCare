import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/User';
import { Response } from 'src/app/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}login`;

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<Response<User>> {
    let params = new HttpParams();
    params = params.append('usuario', usuario);
    params = params.append('senha', senha);

    return this.http.get<Response<User>>(`${this.apiUrl}/login`, { params });
  }

  getUsers(
    usuario: string,
    situacao: string,
    acesso: string
  ): Observable<Response<User[]>> {
    let params = new HttpParams();
    params = params.append('usuario', usuario);
    params = params.append('situacao', situacao);
    params = params.append('acesso', acesso);

    return this.http.get<Response<User[]>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  editUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  removeUser(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url);
  }
}
