import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from 'src/app/Patient';
import { Response } from 'src/app/Response';
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

  getPatients(): Observable<Response<Patient[]>> {
    return this.http.get<Response<Patient[]>>(this.apiUrl);
  }

  getPatientsPaginado(
    page: number,
    limit: number
  ): Observable<Response<Patient[]>> {
    return this.http.get<Response<Patient[]>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  updatePatient(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

  removePatient(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Patient>(url);
  }
}
