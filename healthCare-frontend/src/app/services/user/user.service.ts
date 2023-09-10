import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';
import { User } from 'src/app/interfaces/User';
import { Credentials } from 'src/app/interfaces/Credentials';
import { Authentication } from 'src/app/interfaces/Authentication';
import { Token } from 'src/app/interfaces/Token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.baseApiUrl}login`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  async login(credentials: Credentials) {
    const basicAuth = 'client-id:secret-id';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(basicAuth));

    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', credentials.username);
    params = params.append('password', credentials.password);

    try {
      const result = await lastValueFrom(
        this.http.get<Authentication>(`${environment.baseApiUrl}oauth/token`, {
          headers: headers,
          params: params,
        })
      );
      lastValueFrom(this.getByEmail(result.username))
        .then((user) => {
          if (user) {
            localStorage.setItem(
              'token',
              btoa(JSON.stringify(result.access_token))
            );
            localStorage.setItem('user', btoa(JSON.stringify(user)));
            this.utilsService.showSimpleMessage('Login realizado com sucesso');
            this.router.navigate(['']);
          } else {
            return;
          }
        })
        .catch(() => {
          this.utilsService.showSimpleMessage(
            'Erro no sistema, tente novamente mais tarde'
          );
        });
    } catch {
      this.utilsService.showSimpleMessage('Login inválido');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get getLoggedUser(): User {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')!))
      : null;
  }

  get getLoggedUserId(): string {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')!)).id
      : null;
  }

  get getUserToken(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }

  get logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getByEmail(email: string): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<User>(`${this.apiUrl}/getByEmail`, { params });
  }

  getUsers(
    usuario: string,
    situacao: string,
    acesso: string
  ): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('usuario', usuario);
    params = params.append('situacao', situacao);
    params = params.append('acesso', acesso);

    return this.http.get<User[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/new-user`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/new-user`, user);
  }

  removeUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url);
  }

  sendToken(user: string): Observable<Token> {
    let params = new HttpParams();

    params = params.append('user', user);

    return this.http.post<Token>(`${this.apiUrl}/sendToken`, params);
  }

  checkToken(user: string): Observable<Token> {
    let params = new HttpParams();

    params = params.append('user', user);

    return this.http.get<Token>(`${this.apiUrl}/checkToken`, { params });
  }
}
