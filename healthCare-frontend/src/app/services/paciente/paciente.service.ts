import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paciente } from 'src/app/Paciente';
import { Response } from 'src/app/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}pacientes`;

  constructor(private http: HttpClient) {}

  createPaciente(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getPacientes(): Observable<Response<Paciente[]>> {
    return this.http.get<Response<Paciente[]>>(this.apiUrl);
  }

  updatePaciente(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

  removePaciente(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Paciente>(url);
  }
}
