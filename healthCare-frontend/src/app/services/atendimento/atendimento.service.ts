import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Atendimento } from '../../interfaces/atendimento';
import { AtendsPerson } from '../../interfaces/atends_person';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}atendimentos`;

  constructor(private http: HttpClient) {}

  createAtendimento(formData: FormData): Promise<Atendimento> {
    return lastValueFrom(this.http.post<Atendimento>(this.apiUrl, formData));
  }

  getAtends(userId: number): Promise<Atendimento[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(this.http.get<Atendimento[]>(this.apiUrl, { params }));
  }

  getAtendsPerson(userId: number): Promise<AtendsPerson[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(
      this.http.get<AtendsPerson[]>(`${this.apiUrl}/atends-person`, {
        params,
      })
    );
  }

  getById(id: number): Promise<Atendimento> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<Atendimento>(url));
  }

  updateAtendimento(formData: FormData): Promise<Atendimento> {
    const url = `${this.apiUrl}`;
    return lastValueFrom(this.http.put<Atendimento>(url, formData));
  }

  removeAtendimento(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
