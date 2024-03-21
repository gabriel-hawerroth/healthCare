import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Unidade } from '../../interfaces/unidade';

@Injectable({
  providedIn: 'root',
})
export class UnidadeService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}unidades`;

  constructor(private http: HttpClient) {}

  createUnit(formData: FormData): Promise<Unidade> {
    return lastValueFrom(this.http.post<Unidade>(this.apiUrl, formData));
  }

  getUnits(userId: number): Promise<Unidade[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(this.http.get<Unidade[]>(this.apiUrl, { params }));
  }

  getById(id: number): Promise<Unidade> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<Unidade>(url));
  }

  updateUnit(formData: FormData): Promise<FormData> {
    const url = `${this.apiUrl}`;
    return lastValueFrom(this.http.put<FormData>(url, formData));
  }

  removeUnit(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
