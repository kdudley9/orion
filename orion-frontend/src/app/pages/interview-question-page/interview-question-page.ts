import { Component, inject, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { InterviewQuestion } from '../../models/interview-question';
import { map, Observable, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInterviewQuestionForm } from '../../components/add-interview-question-form/add-interview-question-form';
import { MatMenuModule } from '@angular/material/menu';
import { GenerateQuestionsConfirmation } from '../../components/generate-questions-confirmation/generate-questions-confirmation';
import { QuestionCard } from "../../components/question-card/question-card";

@Component({
  selector: 'app-interview-question-page',
  imports: [AsyncPipe, CommonModule, MatIconModule, MatButtonModule, MatMenuModule, QuestionCard],
  templateUrl: './interview-question-page.html',
  styleUrl: './interview-question-page.css'
})
export class InterviewQuestionPage implements OnInit {
  private interviewQuestionService = inject(InterviewQuestionService);
  private route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  allQuestions$: Observable<InterviewQuestion[]> = of([]);
  generatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  userCreatedQuestions$: Observable<InterviewQuestion[]> = of([]);
  applicationId: number = 0;
  addQuestionDialogWidth = '500px';
  addQuestionDialogHeight = '500px';

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.getQuestions();
  }

  generateQuestions(applicationId: number): void {
    this.dialog.open(GenerateQuestionsConfirmation, {
      data: { applicationId }
    });
  }

  getQuestions(): void {
    this.interviewQuestionService.getAllQuestions(this.applicationId).subscribe();
    this.allQuestions$ = this.interviewQuestionService.interviewQuestions$;
    this.generatedQuestions$ = this.allQuestions$.pipe(map(questions => questions.filter(q => q.aiGenerated)));
    this.userCreatedQuestions$ = this.allQuestions$.pipe(map(questions => questions.filter(q => !q.aiGenerated)));
  }

  openDialog(applicationId: number): void {
    this.dialog.open(AddInterviewQuestionForm, {
      width: this.addQuestionDialogWidth,
      height: this.addQuestionDialogHeight,
      data: { 
        applicationId: applicationId,
        isUpdate: false 
      }
    });
  }
}
