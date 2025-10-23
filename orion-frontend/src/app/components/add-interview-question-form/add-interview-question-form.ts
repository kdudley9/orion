import { Component, inject, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-interview-question-form',
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-interview-question-form.html',
  styleUrl: './add-interview-question-form.css'
})
export class AddInterviewQuestionForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddInterviewQuestionForm>);
  readonly formData = inject<{ applicationId: number }>(MAT_DIALOG_DATA);
  questionForm: any;

  constructor(
    private interviewQuestionService: InterviewQuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.interviewQuestionService.addQuestion(this.formData.applicationId, this.questionForm.value).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        console.error('An error occurred when submitting the form.');
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get question() {
    return this.questionForm.get('question');
  }
}
