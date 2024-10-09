import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetApplicationsService {
  private apiUrl = ''; //TODO: Variabilizar la api y asignar

  constructor(private http: HttpClient) {}

  getDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domains`);
  }

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications`)
  }
}
