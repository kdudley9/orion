import { Component, inject, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { ApplicationCard } from "../../components/application-card/application-card";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ApplicationForm } from '../../components/application-form/application-form';
import { DropdownService } from '../../services/dropdown-service';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-application-details',
  imports: [ApplicationCard, RemoveUnderscoresPipe, MatIconModule, MatButtonModule],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css'
})
export class ApplicationDetails implements OnInit {
  readonly dialog = inject(MatDialog);
  applications: Application[] = [];
  statuses = []
  
  constructor(private applicationDetailsService: ApplicationDetailsService, private dropdownService: DropdownService) {}
  
  ngOnInit(): void {
    const initialDisplayStatus = 'APPLIED';
    this.getApplications(initialDisplayStatus);
    this.getStatuses();
  }

  getStatuses(): void {
    this.dropdownService.getStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }

  getApplications(status: string | null): void {
    this.applicationDetailsService.getApplications().subscribe((data) => {
      this.applications = data.filter((application) => application.status == status);
    });
  }

  openDialog(): void {
    this.dialog.open(ApplicationForm);
  }
}
