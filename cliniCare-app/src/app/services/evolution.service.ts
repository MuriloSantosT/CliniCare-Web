import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evolution } from '../models/evolution.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EvolutionService {
  private apiUrl = `${environment.apiUrl}/evolution`;

  constructor(private http: HttpClient) {}

  create(evolution: Evolution): Observable<Evolution> {
    return this.http.post<Evolution>(`${this.apiUrl}/adicionar`, evolution);
  }

  listByPatient(patientId: number): Observable<Evolution[]> {
    return this.http.get<Evolution[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getById(id: number): Observable<Evolution> {
    return this.http.get<Evolution>(`${this.apiUrl}/${id}`);
  }

  update(id: number, evolution: Partial<Evolution>): Observable<Evolution> {
    return this.http.put<Evolution>(`${this.apiUrl}/atualizar/${id}`, evolution);
  }
}
