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
  currentDate: Date = new Date();
  isoDate: string = '';
  URL_REGEXP: RegExp = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  applicationForm: any;

  MAX_COMPANY_LENGTH: number = 150;
  MAX_JOB_TITLE_LENGTH: number = 150;
  MAX_LOCATION_LENGTH: number = 200;
  MAX_URL_LENGTH: number = 2048;
  MAX_DESCRIPTION_LENGTH: number = 10000;

  constructor() {}

  ngOnInit(): void {
    this.isoDate = this.currentDate.toJSON().slice(0, 10);
    this.applicationForm = this.fb.group({
      company: [this.data.company, [Validators.required, Validators.maxLength(this.MAX_COMPANY_LENGTH)]],
      jobTitle: [this.data.jobTitle, [Validators.required, Validators.maxLength(this.MAX_JOB_TITLE_LENGTH)]],
      location: [this.data.location, [Validators.required, Validators.maxLength(this.MAX_LOCATION_LENGTH)]],
      url: [this.data.url, [Validators.maxLength(2048), Validators.pattern(this.URL_REGEXP)]],
      dateApplied: [this.data.dateApplied, Validators.required],
      industry: [this.data.industry, Validators.required],
      jobType: [this.data.jobType, Validators.required],
      jobDescription: [this.data.jobDescription, Validators.maxLength(this.MAX_DESCRIPTION_LENGTH)]
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
        }
      });
    } else {
      this.applicationListService.updateApplication(this.applicationForm.value, this.data.id).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          console.error('An error occurred when updating the application.');
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
