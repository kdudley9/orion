import { Component, inject, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-add-interview-question-form',
  imports: [MatDialogModule, ReactiveFormsModule, QuillEditorComponent],
  templateUrl: './add-interview-question-form.html',
  styleUrl: './add-interview-question-form.css'
})
export class AddInterviewQuestionForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddInterviewQuestionForm>);
  readonly formData = inject(MAT_DIALOG_DATA);
  questionForm: any;
  noteStyles = {
    width: '450px',
    height: '200px',
    backgroundColor: 'white'
  }

  MAX_QUESTION_LENGTH = 500;
  MAX_NOTE_LENGTH = 10000;

  constructor(
    private interviewQuestionService: InterviewQuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: [this.formData.question, [Validators.required, Validators.maxLength(this.MAX_QUESTION_LENGTH)]],
      note: [this.formData.note, Validators.maxLength(this.MAX_NOTE_LENGTH)]
    });
  }

  onSubmit(): void {
    if (!this.formData.isUpdate) {
      this.interviewQuestionService.addQuestion(this.formData.applicationId, this.questionForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when submitting the form.');
        }
      })
    } else {
      this.interviewQuestionService.updateQuestion(this.formData.applicationId, this.formData.id, this.questionForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when submitting the form.');
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get question() {
    return this.questionForm.get('question');
  }

  get note() {
    return this.questionForm.get('note');
  }
}
