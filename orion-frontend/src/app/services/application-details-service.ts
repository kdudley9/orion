import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Application } from '../models/application';
import { PatchRequest } from '../models/patch-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService {
  private readonly baseUrl = '/api/application-details';
  private http = inject(HttpClient);
  private _applications = new BehaviorSubject<Application[]>([]);
  applications$ = this._applications.asObservable();

  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.baseUrl, application, { 
      withCredentials: true 
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not add application ' + err);
      }),
      tap((newApplication) => {
          const currentApplications = this._applications.value;
          this._applications.next([...currentApplications, newApplication]);
        }
      )
    );
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
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not retrieve application ' + err);
      }),
      tap((application) => this._applications.next([application]))
    );
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`/api/application-details`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not retrieve applications ' + err);
      }),
      tap((applications) => this._applications.next(applications))
    );
  }

  deleteApplication(applicationId: number | undefined) {
    const currentApplications = this._applications.value;
    const newApplications = currentApplications.filter(app => app.id !== applicationId);
    return this.http.delete(`/api/application-details/${applicationId}`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not delete application: ' + err)
      }),
      tap(() => this._applications.next(newApplications))
    );
  }

  deleteAllAplications() {
    return this.http.delete('/api/application-details', {
      withCredentials: true
    }).pipe(
      catchError((err) => {
        throw new Error('Could not delete all applications: ' + err);
      }),
      tap(() => this._applications.next([]))
    );
  }
}
