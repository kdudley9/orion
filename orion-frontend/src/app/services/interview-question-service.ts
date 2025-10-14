import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InterviewQuestion } from '../models/interview-question';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {
  private readonly baseUrl =  `/api/application-details`
  private _deleteSuccessfulEvent$ = new BehaviorSubject<any | undefined>(undefined);

  constructor(private http: HttpClient) {}

  generateQuestions(applicationId: number): void {
    this.http.get(
      `${this.baseUrl}/${applicationId}/interview-questions/ai-generate-questions`,
      {
        withCredentials: true
      }
    );
  }

  getAllQuestions(applicationId: number): Observable<InterviewQuestion[]> {
    return this.http.get<InterviewQuestion[]>(`${this.baseUrl}/${applicationId}/interview-questions`, {
      withCredentials: true
    });
  }

  deleteQuestion(applicationId: number, questionId: number) {
    this.http.delete(`${this.baseUrl}/${applicationId}/interview-questions/${questionId}`, {
      withCredentials: true
    })
    .subscribe({
      next: () => {
        this._deleteSuccessfulEvent$.next(true);
      },
      error: () => {
        this._deleteSuccessfulEvent$.next(false);
      }
    });
  }

  get deleteSuccessfulEvent$(): Observable<boolean> {
    return this._deleteSuccessfulEvent$.asObservable();
  }
}
