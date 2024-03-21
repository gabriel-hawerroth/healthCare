import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Authentication } from '../../interfaces/authentication';
import { Credentials } from '../../interfaces/credentials';
import { User } from '../../interfaces/user';
import { UtilsService } from '../../utils/utils.service';

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

      await this.getByEmail(result.username)
        .then((user) => {
          if (!user) return;

          if (user.situacao === 'I') {
            this.utilsService.showSimpleMessage('Usuário inativo');
            return;
          }

          this.router.navigate(['']);
          this.utilsService.setItemLocalStorage(
            'tokenHealthcare',
            btoa(JSON.stringify(result.access_token))
          );
          this.utilsService.setItemLocalStorage(
            'userHealthCare',
            btoa(JSON.stringify(user))
          );
          this.utilsService.showSimpleMessage('Login realizado com sucesso');
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
    this.utilsService.removeItemLocalStorage('tokenHealthcare');
    localStorage.removeItem('userHealthCare');
    this.router.navigate(['login']);
  }

  get getLoggedUser(): User {
    return this.utilsService.getItemLocalStorage('userHealthCare')
      ? JSON.parse(
          atob(this.utilsService.getItemLocalStorage('userHealthCare')!)
        )
      : null;
  }

  get getLoggedUserId() {
    return this.utilsService.getItemLocalStorage('userHealthCare')
      ? Number(
          JSON.parse(
            atob(this.utilsService.getItemLocalStorage('userHealthCare')!)
          ).id
        )
      : null;
  }

  get getUserToken(): string {
    return this.utilsService.getItemLocalStorage('tokenHealthcare')
      ? JSON.parse(
          atob(this.utilsService.getItemLocalStorage('tokenHealthcare')!)
        )
      : null;
  }

  get logged(): boolean {
    return this.utilsService.getItemLocalStorage('tokenHealthcare')
      ? true
      : false;
  }

  getByEmail(email: string): Promise<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return lastValueFrom(
      this.http.get<User>(`${this.apiUrl}/getByEmail`, { params })
    );
  }

  getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  getById(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<User>(url));
  }

  newUser(user: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(`${this.apiUrl}/new-user`, user));
  }

  editUser(user: User): Promise<User> {
    return lastValueFrom(this.http.put<User>(`${this.apiUrl}/editUser`, user));
  }

  removeUser(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<User>(url));
  }

  sendAccountActivationEmail(userId: number): Promise<Token> {
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
