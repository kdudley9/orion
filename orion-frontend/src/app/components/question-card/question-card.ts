import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { MatDialog } from '@angular/material/dialog';
import { InterviewQuestion } from '../../models/interview-question';
import { ActivatedRoute } from '@angular/router';
import { AddInterviewQuestionForm } from '../add-interview-question-form/add-interview-question-form';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { of, tap } from 'rxjs';
import { QuillViewComponent } from "ngx-quill";
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question-card',
  imports: [MatIcon, MatIconModule, MatButtonModule, MatMenu, MatMenuModule, QuillViewComponent],
  templateUrl: './question-card.html',
  styleUrl: './question-card.css'
})
export class QuestionCard implements OnInit {
  private interviewQuestionService = inject(InterviewQuestionService);
  private route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  question = input.required<InterviewQuestion>();
  applicationId: number = 0;
  addQuestionDialogWidth = '500px';
  addQuestionDialogHeight = '500px';
  deleteQuestion$ = of();

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
  }

  deleteQuestion(): void {
    this.deleteQuestion$ = this.interviewQuestionService.deleteQuestion(this.applicationId, this.question().id)
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
  }

  onUpdateQuestion(): void {
    this.dialog.open(AddInterviewQuestionForm, {
      width: this.addQuestionDialogWidth,
      height: this.addQuestionDialogHeight,
      data: {
        applicationId: this.applicationId,
        id: this.question().id,
        question: this.question().question,
        note: this.question().note,
        isUpdate: true
      }
    });
  }
}
