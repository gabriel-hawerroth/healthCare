import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Unidade } from 'src/app/models/Unidade';
import { Response } from 'src/app/models/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadeService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}unidades`;

  constructor(private http: HttpClient) {}

  createUnit(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getUnits(dsNome: string, ieSituacao: string): Observable<Unidade[]> {
    let params = new HttpParams();
    params = params.append('dsNome', dsNome);
    params = params.append('ieSituacao', ieSituacao);

    return this.http.get<Unidade[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Unidade> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Unidade>(url);
  }

  updateUnit(formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}`;
    return this.http.put<FormData>(url, formData);
  }

  removeUnit(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Unidade>(url);
  }
}
