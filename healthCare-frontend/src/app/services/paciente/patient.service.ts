import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from 'src/app/interfaces/Patient';
import { Response } from 'src/app/interfaces/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}pacientes`;

  constructor(private http: HttpClient) {}

  createPatient(patient: Patient) {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  getPatients(dsNome: string, ieSituacao: string): Observable<Patient[]> {
    let params = new HttpParams();
    params = params.append('dsNome', dsNome);
    params = params.append('ieSituacao', ieSituacao);

    return this.http.get<Patient[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Patient> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Patient>(url);
  }

  getPatientsPaginado(
    page: number,
    limit: number
  ): Observable<Response<Patient[]>> {
    return this.http.get<Response<Patient[]>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  updatePatient(formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}`;
    return this.http.put<FormData>(url, formData);
  }

  removePatient(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Patient>(url);
  }
}
