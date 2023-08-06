import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Unidade } from 'src/app/Unidade';
import { Response } from 'src/app/Response';
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

  getUnits(): Observable<Response<Unidade[]>> {
    return this.http.get<Response<Unidade[]>>(this.apiUrl);
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
