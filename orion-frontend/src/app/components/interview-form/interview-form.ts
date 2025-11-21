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
  readonly formData = inject(MAT_DIALOG_DATA);
  interviewTypes = [];

  interviewForm: any;

  constructor(
    private interviewService: InterviewService, 
    private dropdownService: DropdownService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getInterviewTypes();
    this.interviewForm = this.fb.group({
      interviewDate: [this.formData.interviewDate, Validators.required],
      location: [this.formData.location, Validators.required],
      meetingLink: [this.formData.meetingLink],
      interviewType: [this.formData.interviewType, Validators.required],
      interviewers: this.fb.array([])
    });
    this.setInterviewers();
  }

  getInterviewTypes(): void {
    this.dropdownService.getInterviewTypes().subscribe(data => {
      this.interviewTypes = data;
    });
  }

  onSubmit(): void {
    if (!this.formData.isUpdate) {
      this.interviewService.addInterview(this.formData.applicationId, this.interviewForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when submitting the form.');
        }
      });
    } else {
      this.interviewService.updateInterview(this.formData.applicationId, this.formData.interviewId, this.interviewForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when updating interview details.');
        }
      });
    }
  }

  setInterviewers(): void {
    const interviewers = this.formData.interviewers;
    // Adding controls in reverse to preserve the order interviewers were originally added in
    for (let i = interviewers.length - 1; i >= 0; i--) {
      let fieldGroup = this.fb.group({
        name: [interviewers[i].name, Validators.required],
        phoneNumber: [interviewers[i].phoneNumber],
        email: [interviewers[i].email, Validators.email]
      });
      this.interviewers.push(fieldGroup);
    }
  }

  addInterviewer(): void {
    const fieldGroup = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.email]
    });
    this.interviewers.push(fieldGroup);
  }

  removeInterviewerField(index: number): void {
    this.interviewers.removeAt(index);
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

  get interviewers() {
    return this.interviewForm.get('interviewers') as FormArray;
  }
}
