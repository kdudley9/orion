import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterviewService } from '../../services/interview-service';
import { DropdownService } from '../../services/dropdown-service';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";

@Component({
  selector: 'app-interview-form',
  imports: [MatDialogModule, ReactiveFormsModule, RemoveUnderscoresPipe],
  templateUrl: './interview-form.html',
  styleUrl: './interview-form.css'
})
export class InterviewForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<InterviewForm>);
  readonly formData = inject<{ applicationId: number }>(MAT_DIALOG_DATA);
  interviewTypes = [];

  interviewForm: any;

  constructor(
    private interviewService: InterviewService, 
    private dropdownService: DropdownService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.formData.applicationId);
    this.getInterviewTypes();
    this.interviewForm = this.fb.group({
      interviewDate: ['', Validators.required],
      location: ['', Validators.required],
      meetingLink: [''],
      interviewType: ['', Validators.required],
      interviewerFields: this.fb.array([])
    });
  }

  getInterviewTypes(): void {
    this.dropdownService.getInterviewTypes().subscribe(data => {
      this.interviewTypes = data;
    });
  }

  onSubmit(): void {
    this.interviewService.addInterview(this.formData.applicationId, this.interviewForm.value).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        console.error('An error occurred when submitting the form.');
      }
    });
  }

  addInterviewer(): void {
    const fieldGroup = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.email]
    });
    this.interviewerFields.push(fieldGroup);
  }

  removeInterviewerField(index: number): void {
    this.interviewerFields.removeAt(index);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get interviewDate() {
    return this.interviewForm.get('interviewDate');
  }

  get location() {
    return this.interviewForm.get('location');
  }

  get meetingLink() {
    return this.interviewForm.get('meetingLink');
  }

  get interviewType() {
    return this.interviewForm.get('interviewType');
  }

  get interviewerFields() {
    return this.interviewForm.get('interviewerFields') as FormArray;
  }
}
