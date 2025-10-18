import { Component, inject, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { InterviewQuestion } from '../../models/interview-question';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInterviewQuestionForm } from '../../components/add-interview-question-form/add-interview-question-form';

@Component({
  selector: 'app-interview-question-page',
  imports: [AsyncPipe, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './interview-question-page.html',
  styleUrl: './interview-question-page.css'
})
export class InterviewQuestionPage implements OnInit {
  allQuestions$: Observable<InterviewQuestion[]> = of([]);
  generatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  userCreatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  deleteSuccessfulSubscription: Subscription = new Subscription();
  applicationId: number = 0;
  readonly dialog = inject(MatDialog);

  constructor(private interviewQuestionService: InterviewQuestionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.deleteSuccessfulSubscription = this.interviewQuestionService.deleteSuccessfulEvent$.subscribe(isSuccessful => {
      if (isSuccessful) {
        this.getQuestions()
      }
    });
    this.getQuestions();
  }

  generateQuestions(): void {
    this.interviewQuestionService.generateQuestions(this.applicationId);
  }

  getQuestions(): void {
    this.allQuestions$ = this.interviewQuestionService.getAllQuestions(this.applicationId);

    this.generatedQuestions$ = this.allQuestions$
      .pipe(map(questions => questions.filter(q => q.aiGenerated)));
    
    this.userCreatedQuestions$ = this.allQuestions$
      .pipe(map(questions => questions.filter(q => !q.aiGenerated)));
  }

  openDialog(applicationId: number): void {
    this.dialog.open(AddInterviewQuestionForm, {
      data: { applicationId }
    });
  }

  deleteQuestion(questionId: number): void {
    this.interviewQuestionService.deleteQuestion(this.applicationId, questionId);
  }
}
