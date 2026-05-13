import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evolution } from '../models/evolution.model';

@Injectable({ providedIn: 'root' })
export class EvolutionService {
  private apiUrl = 'http://localhost:8080/evolution';

  constructor(private http: HttpClient) {}

  create(evolution: Evolution): Observable<Evolution> {
    return this.http.post<Evolution>(`${this.apiUrl}/adicionar`, evolution);
  }

  listByPatient(patientId: number): Observable<Evolution[]> {
    return this.http.get<Evolution[]>(`${this.apiUrl}/patient/${patientId}`);
  }
}
