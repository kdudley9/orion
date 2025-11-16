import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DropdownService } from '../../services/dropdown-service';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { ApplicationListService } from '../../services/application-list-service';

@Component({
  selector: 'app-application-form',
  imports: [MatDialogModule, ReactiveFormsModule, RemoveUnderscoresPipe],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css'
})
export class ApplicationForm implements OnInit {
  private applicationListService = inject(ApplicationListService);
  private dropdownService = inject(DropdownService);
  private fb = inject(FormBuilder);
  data: any = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ApplicationForm>);
  industries = [];
  jobTypes = [];

  applicationForm: any;

  constructor() {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      company: [this.data.company, Validators.required],
      jobTitle: [this.data.jobTitle, Validators.required],
      location: [this.data.location, Validators.required],
      url: [this.data.url, Validators.required],
      dateApplied: [this.data.dateApplied, Validators.required],
      industry: [this.data.industry, Validators.required],
      jobType: [this.data.jobType, Validators.required],
      jobDescription: [this.data.jobDescription, Validators.maxLength(10000)]
    });
    this.getIndustries();
    this.getJobTypes();
  }

  getIndustries(): void {
    this.dropdownService.getIndustries().subscribe((data) => {
      this.industries = data;
    });
  }

  getJobTypes(): void {
    this.dropdownService.getJobTypes().subscribe((data) => {
      this.jobTypes = data;
    });
  }

  onSubmit(): void {
    if (!this.data.isUpdate) {
      this.applicationListService.addApplication(this.applicationForm.value).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when submitting the form.');
          this.dialogRef.close();
        }
      });
    } else {
      this.applicationListService.updateApplication(this.applicationForm.value, this.data.id).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when updating the application.');
          this.dialogRef.close();
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get company() {
    return this.applicationForm.get('company');
  }

  get jobTitle() {
    return this.applicationForm.get('jobTitle');
  }

  get location() {
    return this.applicationForm.get('location');
  }

  get url() {
    return this.applicationForm.get('url');
  }

  get dateApplied() {
    return this.applicationForm.get('dateApplied');
  }

  get industry() {
    return this.applicationForm.get('industry');
  }

  get jobType() {
    return this.applicationForm.get('jobType');
  }

  get jobDescription() {
    return this.applicationForm.get('jobDescription');
  }
}
