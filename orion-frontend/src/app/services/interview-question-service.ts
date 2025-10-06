import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterviewQuestion } from '../models/interview-question';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {
  private readonly baseUrl =  `/api/application-details`
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

  deleteQuestion(applicationId: number, questionId: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${applicationId}/interview-questions/${questionId}`, {
      withCredentials: true
    });
  }
}
