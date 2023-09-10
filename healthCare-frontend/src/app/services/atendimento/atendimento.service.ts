import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Atendimento } from 'src/app/interfaces/Atendimento';
import { AtendsPerson } from 'src/app/interfaces/AtendsPerson';
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

  getAtendimentos(
    nm_paciente: string,
    nm_unidade: string,
    dt_inicial: Date,
    dt_final: Date
  ): Observable<AtendsPerson[]> {
    let params = new HttpParams();
    params = params.set('nm_paciente', nm_paciente);
    params = params.set('nm_unidade', nm_unidade);
    params = params.set('dt_inicial', moment(dt_inicial).toISOString());
    params = params.set('dt_final', moment(dt_final).toISOString());

    return this.http.get<AtendsPerson[]>(`${this.apiUrl}/atendsPerson`, {
      params,
    });
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
