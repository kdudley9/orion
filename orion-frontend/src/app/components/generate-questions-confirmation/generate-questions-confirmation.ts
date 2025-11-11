import { Component, DestroyRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-generate-questions-confirmation',
  imports: [MatDialogModule],
  templateUrl: './generate-questions-confirmation.html',
  styleUrl: './generate-questions-confirmation.css'
})
export class GenerateQuestionsConfirmation {
  readonly dialogRef = inject(MatDialogRef<GenerateQuestionsConfirmation>);
  readonly formData = inject<{ applicationId: number}>(MAT_DIALOG_DATA);
  private readonly destroyRef = inject(DestroyRef);
  private interviewQuestionService = inject(InterviewQuestionService);

  onCancel(): void {
    this.dialogRef.close();
  }

  confirmBtnClicked(): void {
    this.interviewQuestionService.generateQuestions(this.formData.applicationId)
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
    this.dialogRef.close();
  }
}
