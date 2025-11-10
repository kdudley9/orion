import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Application } from '../models/application';
import { PatchRequest } from '../models/patch-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicationListService {
  private http = inject(HttpClient);

  private readonly baseUrl = '/api/application-details';
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
          this._applications.next([newApplication, ...currentApplications]);
        }
      )
    );
  }

  updateApplication(application: Application, applicationId: number): Observable<Application> {
    return this.http.put<Application>(`/api/application-details/${applicationId}`, application, {
      withCredentials: true
    });
  }

  patchApplication(application: PatchRequest[], applicationId: number | undefined): Observable<Application> {
    return this.http.patch<Application>(`/api/application-details/${applicationId}`, application, {
      withCredentials: true
    }).pipe(
      catchError((err) => {
        throw new Error('Error occurred when updating application: ' + err)
      }),
      tap((newApplication) => {
        let currentApplications = this._applications.value;
        const index = currentApplications.findIndex(app => app.id === applicationId);
        currentApplications[index] = newApplication;
        this._applications.next(currentApplications);
      })
    );
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
      tap((applications) => {
        this._applications.next(applications)
      })
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

  companyLogo(companyName: string): string | null {
    const firstChar: string = companyName[0];
    const alphaNumericRegex: RegExp = /[a-zA-Z0-9]/;

    if (alphaNumericRegex.test(firstChar)) {
      return firstChar;
    }
    return null;
  }

  companyLogoColor(logoChar: string | null): string | undefined {
    const gradientMap: Map<number, string> = new Map([
      [0, 'linear-gradient(#3B82F6, #6366F1)'],
      [1, 'linear-gradient(#06B6D4, #0D9488)'],
      [2, 'linear-gradient(#F97316, #FACC15)'],
      [3, 'linear-gradient(#FB7185, #EC4899)'],
      [4, 'linear-gradient(#10B981, #84CC16)'],
      [5, 'linear-gradient(#14B8A6, #3B82F6)'],
      [6, 'linear-gradient(#9CA3AF, #64748B)'],
      [7, 'linear-gradient(#8B5CF6, #A855F7)']
    ]);

    if (logoChar) {
      const colorKey: number = logoChar.charCodeAt(0) % gradientMap.size;
      return gradientMap.get(colorKey);
    }

    return 'linear-gradient(#6E2594, #2DD4Bf)';
  }
}
