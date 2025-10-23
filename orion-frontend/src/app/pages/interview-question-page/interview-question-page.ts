import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { InterviewQuestion } from '../../models/interview-question';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInterviewQuestionForm } from '../../components/add-interview-question-form/add-interview-question-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-interview-question-page',
  imports: [AsyncPipe, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './interview-question-page.html',
  styleUrl: './interview-question-page.css'
})
export class InterviewQuestionPage implements OnInit {
  private interviewQuestionService = inject(InterviewQuestionService);
  private route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  allQuestions$: Observable<InterviewQuestion[]> = of([]);
  generatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  userCreatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  applicationId: number = 0;

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.getQuestions();
  }

  generateQuestions(): void {
    this.interviewQuestionService.generateQuestions(this.applicationId).subscribe();
  }

  getQuestions(): void {
    this.interviewQuestionService.getAllQuestions(this.applicationId).subscribe();

    this.allQuestions$ = this.interviewQuestionService.interviewQuestions$

    this.generatedQuestions$ = this.allQuestions$.pipe(map(questions => questions.filter(q => q.aiGenerated)));

    this.userCreatedQuestions$ = this.allQuestions$.pipe(map(questions => questions.filter(q => !q.aiGenerated)));
  }

  openDialog(applicationId: number): void {
    this.dialog.open(AddInterviewQuestionForm, {
      data: { applicationId }
    });
  }

  deleteQuestion(questionId: number): void {
    this.interviewQuestionService.deleteQuestion(this.applicationId, questionId)
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
  }
}
