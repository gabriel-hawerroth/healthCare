import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Atendimento } from 'src/app/Atendimento';
import { AtendsPerson } from 'src/app/AtendsPerson';
import { Response } from 'src/app/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}atendimentos`;

  constructor(private http: HttpClient) {}

  createAtendimento(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getAtendimentos(): Observable<Response<AtendsPerson[]>> {
    return this.http.get<Response<AtendsPerson[]>>(
      `${this.apiUrl}/atendsPerson`
    );
  }

  getById(id: number): Observable<Atendimento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Atendimento>(url);
  }

  updateAtendimento(formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}`;
    return this.http.put<FormData>(url, formData);
  }

  removeAtendimento(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Atendimento>(url);
  }
}
