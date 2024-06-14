import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}patient`;

  constructor(private http: HttpClient) {}

  getPatients(userId: number): Promise<Patient[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(this.http.get<Patient[]>(this.apiUrl, { params }));
  }

  getById(id: number): Promise<Patient> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<Patient>(url));
  }

  savePatient(patient: Patient): Promise<Patient> {
    return lastValueFrom(this.http.post<Patient>(this.apiUrl, patient));
  }

  removePatient(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
