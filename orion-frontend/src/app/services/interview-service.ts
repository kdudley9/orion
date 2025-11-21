import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Interview, UpcomingInterview } from '../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private http = inject(HttpClient);
  
  private readonly baseUrl =  `/api/application-details`;
  private _interviews = new BehaviorSubject<Interview[]>([]);
  interviews$ = this._interviews.asObservable();

  getInterviews(applicationId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.baseUrl}/${applicationId}/interviews`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not retrieve interviews: ' + err);
      }),
      tap((interviews) => this._interviews.next(interviews))
    );
  }

  getUpcomingInterview(): Observable<UpcomingInterview> {
    return this.http.get<UpcomingInterview>(`${this.baseUrl}/upcoming-interview`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not retrieve upcoming interview: ' + err);
      })
    );
  }

  addInterview(applicationId: number, interview: Interview): Observable<Interview> {
    return this.http.post<Interview>(`${this.baseUrl}/${applicationId}/interviews`, interview, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not add interview: ' + err);
      }),
      tap((newInterview) => {
        const currentInterviews = this._interviews.value;
        this._interviews.next([newInterview, ...currentInterviews]);
      })
    );
  }

  deleteInterview(applicationId: number, interviewId: number) {
    const newInterviews: Interview[] = this._interviews.value.filter(interview => interview.id !== interviewId);
    return this.http.delete(`${this.baseUrl}/${applicationId}/interviews/${interviewId}`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not delete interview: ' + err);
      }),
      tap(() => {
        this._interviews.next(newInterviews);
      })
    );
  }

  updateInterview(applicationId: number, interviewId: number, updatedInterview: Interview): Observable<Interview> {
    return this.http.put<Interview>(`${this.baseUrl}/${applicationId}/interviews/${interviewId}`, 
      updatedInterview, {
      withCredentials: true
    }).pipe(
      catchError((err) => {
        throw new Error('Could not update interview ' + err);
      }),
      tap((newInterview) => {
        let currentInterviews = this._interviews.value;
        const index = currentInterviews.findIndex(i => i.id === interviewId);
        currentInterviews[index] = newInterview;
        this._interviews.next(currentInterviews);
      })
    );
  }
}
