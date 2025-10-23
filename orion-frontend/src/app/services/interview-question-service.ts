import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { InterviewQuestion } from '../models/interview-question';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {
  private http = inject(HttpClient);

  private readonly baseUrl =  `/api/application-details`;
  private _interviewQuestions = new BehaviorSubject<InterviewQuestion[]>([]);
  interviewQuestions$ = this._interviewQuestions.asObservable();

  generateQuestions(applicationId: number): Observable<InterviewQuestion[]> {
    return this.http.get<InterviewQuestion[]>(
      `${this.baseUrl}/${applicationId}/interview-questions/ai-generate-questions`, {
        withCredentials: true
      }
    )
    .pipe(
      catchError((err) => {
        throw new Error('Failed to generate practice questions: ' + err);
      }),
      tap((questions) => {
        // This API endpoint returns all questions (AI generated and user created), so the 
        // BehaviorSubject just needs to be updated
        this._interviewQuestions.next(questions);
      })
    );
  }

  getAllQuestions(applicationId: number): Observable<InterviewQuestion[]> {
    return this.http.get<InterviewQuestion[]>(`${this.baseUrl}/${applicationId}/interview-questions`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not retrieve interview questions: ' + err);
      }),
      tap((questions) => this._interviewQuestions.next(questions))
    );
  }

  addQuestion(applicationId: number, question: InterviewQuestion): Observable<InterviewQuestion> {
    const currentQuestions = this._interviewQuestions.value;
    return this.http.post<InterviewQuestion>(
      `${this.baseUrl}/${applicationId}/interview-questions`, question, {
        withCredentials: true
      }
    )
    .pipe(
      catchError((err) => {
        throw new Error('Could not add interview question: ' + err);
      }),
      tap(() => this._interviewQuestions.next([...currentQuestions, question]))
    );
  }

  updateQuestion(applicationId: number, question: InterviewQuestion): Observable<InterviewQuestion> {
    return this.http.put<InterviewQuestion>(
      `${this.baseUrl}/${applicationId}/interview-questions/${question.id}`, question,
      {
        withCredentials: true
      }
    );
  }

  deleteQuestion(applicationId: number, questionId: number) {
    return this.http.delete(`${this.baseUrl}/${applicationId}/interview-questions/${questionId}`, {
      withCredentials: true
    })
    .pipe(
      catchError((err) => {
        throw new Error('Could not delete question: ' + err);
      }),
      tap(() => {
        const newQuestions = this._interviewQuestions.value.filter(question => question.id !== questionId);
        this._interviewQuestions.next(newQuestions);
      })
    )
  }
}
