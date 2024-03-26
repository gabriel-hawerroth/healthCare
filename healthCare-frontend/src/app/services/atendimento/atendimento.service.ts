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
  private apiUrl = `${this.baseApiUrl}attendance`;

  constructor(private http: HttpClient) {}

  getAtends(userId: number): Promise<AtendsPerson[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return lastValueFrom(
      this.http.get<AtendsPerson[]>(this.apiUrl, {
        params,
      })
    );
  }

  getById(id: number): Promise<Atendimento> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.get<Atendimento>(url));
  }

  saveAttendance(attendance: Atendimento): Promise<Atendimento> {
    return lastValueFrom(this.http.post<Atendimento>(this.apiUrl, attendance));
  }

  removeAtendimento(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
