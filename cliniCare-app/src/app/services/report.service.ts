import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = `${environment.apiUrl}/report`;

  constructor(private http: HttpClient) {}

  create(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/adicionar`, report);
  }

  listByPatient(patientId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  update(id: number, report: Partial<Report>): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/atualizar/${id}`, report);
  }
}
