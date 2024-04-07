import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.baseApiUrl}user`;

  constructor(private http: HttpClient) {}

  getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  getById(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<User>(url));
  }

  getByEmail(email: string): Promise<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return lastValueFrom(
      this.http.get<User>(`${this.apiUrl}/get-by-email`, { params })
    );
  }

  saveUser(data: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(this.apiUrl, data));
  }

  removeUser(id: number): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<User>(url));
  }
}
