import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { PatchRequest } from '../models/patch-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService {
  constructor(private http: HttpClient) {}

  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>('/api/application-details', application, {
      withCredentials: true
    });
  }

  updateApplication(application: Application, applicationId: number): Observable<Application> {
    return this.http.put<Application>(`/api/application-details/${applicationId}`, application, {
      withCredentials: true
    });
  }

  patchApplication(application: PatchRequest[], applicationId: number | undefined): Observable<PatchRequest[]> {
    return this.http.patch<PatchRequest[]>(`/api/application-details/${applicationId}`, application, {
      withCredentials: true
    });
  }

  getApplication(applicationId: number): Observable<Application> {
    return this.http.get<Application>(`/api/application-details/${applicationId}`, {
      withCredentials: true
    });
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`/api/application-details`, {
      withCredentials: true
    });
  }

  deleteApplication(applicationId: number | undefined) {
    return this.http.delete(`/api/application-details/${applicationId}`, {
      withCredentials: true
    });
  }

  deleteAllAplications(): void {
    this.http.delete('/api/application-details', {
      withCredentials: true
    });
  }
}
