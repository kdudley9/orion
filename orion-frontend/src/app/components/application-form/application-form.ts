import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DropdownService } from '../../services/dropdown-service';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { ApplicationListService } from '../../services/application-list-service';
import { Application } from '../../models/application';

@Component({
  selector: 'app-application-form',
  imports: [MatDialogModule, ReactiveFormsModule, RemoveUnderscoresPipe],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css'
})
export class ApplicationForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ApplicationForm>);
  industries = [];
  jobTypes = [];
  newApplication: Application = {
    company: '',
    jobTitle: '',
    location: '',
    url: '',
    dateApplied: '',
    industry: '',
    jobType: ''
  };

  applicationForm = new FormGroup({
    company: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    jobTitle: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    url: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(2048)]
    }),
    dateApplied: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    industry: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    jobType: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    jobDescription: new FormControl('', {
      nonNullable: true,
      validators: Validators.maxLength(10000)
    })
  });

  constructor(private applicationListService: ApplicationListService, private dropdownService: DropdownService) {}

  ngOnInit(): void {
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
    this.newApplication = {...this.newApplication, ...this.applicationForm.value}; 
    this.applicationListService.addApplication(this.newApplication).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        console.error('An error occurred when submitting the form.');
      }
    });
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
