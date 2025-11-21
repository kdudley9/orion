import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { ApplicationCard } from "../../components/application-card/application-card";
import { MatDialog } from '@angular/material/dialog';
import { ApplicationForm } from '../../components/application-form/application-form';
import { DropdownService } from '../../services/dropdown-service';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { InterviewCard } from "../../components/interview-card/interview-card";
import { map, Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DeleteConfirmation } from '../../components/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-application-list',
  imports: [ApplicationCard, MatIconModule, MatButtonModule, InterviewCard, CommonModule],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css'
})
export class ApplicationList implements OnInit {
  readonly dialog = inject(MatDialog);
  private appService = inject(ApplicationListService);
  private readonly destroyRef = inject(DestroyRef);
  applicationSubscription$: Observable<Application[]> = of([]);
  statuses = [];
  activeTab: string | null = 'APPLIED';
  
  constructor(private dropdownService: DropdownService) {}
  
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
    this.appService.getApplications().subscribe();
    this.applicationSubscription$ = this.appService.applications$.pipe(
      map(apps => apps.filter(a => a.status === status))
    );
    this.activeTab = status;
  }

  openDialog(): void {
    this.dialog.open(ApplicationForm, {
      data: { isUpdate: false }
    });
  }

  deleteAllClicked(): void {
    this.dialog.open(DeleteConfirmation);
  }
}
