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
      this.getByEmail(result.username)
        .then((user) => {
          if (user.situacao === 'I') {
            this.utilsService.showSimpleMessage('Usuário inativo');
            return;
          }
          if (user) {
            localStorage.setItem(
              'tokenHealthcare',
              btoa(JSON.stringify(result.access_token))
            );
            localStorage.setItem('userHealthCare', btoa(JSON.stringify(user)));
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
    localStorage.removeItem('tokenHealthcare');
    localStorage.removeItem('userHealthCare');
    this.router.navigate(['login']);
  }

  get getLoggedUser(): User {
    return localStorage.getItem('userHealthCare')
      ? JSON.parse(atob(localStorage.getItem('userHealthCare')!))
      : null;
  }

  get getLoggedUserId() {
    return localStorage.getItem('userHealthCare')
      ? Number(JSON.parse(atob(localStorage.getItem('userHealthCare')!)).id)
      : null;
  }

  get getUserToken(): string {
    return localStorage.getItem('tokenHealthcare')
      ? JSON.parse(atob(localStorage.getItem('tokenHealthcare')!))
      : null;
  }

  get logged(): boolean {
    return localStorage.getItem('tokenHealthcare') ? true : false;
  }

  getByEmail(email: string): Promise<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return lastValueFrom(
      this.http.get<User>(`${this.apiUrl}/getByEmail`, { params })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<User>(url));
  }

  newUser(user: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(`${this.apiUrl}/new-user`, user));
  }

  createUser(user: User): Promise<User> {
    return lastValueFrom(
      this.http.post<User>(`${this.apiUrl}/createUser`, user)
    );
  }

  editUser(user: User): Promise<User> {
    return lastValueFrom(this.http.put<User>(`${this.apiUrl}/editUser`, user));
  }

  removeUser(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<User>(url));
  }

  SendAccountActivationEmail(userId: number): Promise<Token> {
    let params = new HttpParams();

    params = params.append('userId', userId);

    return lastValueFrom(
      this.http.post<Token>(`${this.apiUrl}/sendActivateAccountEmail`, params)
    );
  }

  sendChangePasswordEmail(userId: number): Promise<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(
      this.http.post(`${this.apiUrl}/sendChangePasswordEmail`, params)
    );
  }

  changePassword(userId: number, newPassword: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('newPassword', newPassword);

    return lastValueFrom(
      this.http.put(`${this.apiUrl}/changePassword`, params)
    );
  }
}
