import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from '../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  baseUrl =  `/api/application-details`
  constructor(private http: HttpClient) {}

  getInterviews(applicationId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.baseUrl}/${applicationId}/interviews`, {
      withCredentials: true
    });
  }

  addInterview(applicationId: number, interview: Interview): Observable<Interview> {
    return this.http.post<Interview>(`${this.baseUrl}/${applicationId}/interviews`, interview, {
      withCredentials: true
    });
  }

  deleteInterview(applicationId: number, interviewId: number) {
    return this.http.delete(`${this.baseUrl}/${applicationId}/interviews/${interviewId}`, {
      withCredentials: true
    });
  }

  updateInterview(applicationId: number, updatedInterview: Interview): Observable<Interview> {
    return this.http.put<Interview>(`${this.baseUrl}/${applicationId}/interviews/${updatedInterview.id}`, 
      updatedInterview, {
      withCredentials: true
    });
  }
}
