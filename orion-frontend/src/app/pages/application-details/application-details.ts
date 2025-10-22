import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { ApplicationCard } from "../../components/application-card/application-card";
import { MatDialog } from '@angular/material/dialog';
import { ApplicationForm } from '../../components/application-form/application-form';
import { DropdownService } from '../../services/dropdown-service';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { InterviewCard } from "../../components/interview-card/interview-card";
import { map, Observable, of, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-application-details',
  imports: [ApplicationCard, MatIconModule, MatButtonModule, InterviewCard, CommonModule],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css'
})
export class ApplicationDetails implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  private appService = inject(ApplicationDetailsService);
  private readonly destroyRef = inject(DestroyRef);
  applicationSubscription$: Observable<Application[]> = of([]);
  statuses = [];
  
  constructor(private dropdownService: DropdownService) {}
  
  ngOnInit(): void {
    const initialDisplayStatus = 'APPLIED';
    this.getApplications(initialDisplayStatus);
    this.getStatuses();
  }

  ngOnDestroy(): void {
    // this.applicationSubscription?.unsubscribe();
  }

  getStatuses(): void {
    this.dropdownService.getStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }

  getApplications(status: string | null) {
    this.appService.getApplications().subscribe();
    this.applicationSubscription$ = this.appService.applications$.pipe(
      map(apps => apps.filter(a => a.status === status))
    );
  }

  openDialog(): void {
    this.dialog.open(ApplicationForm);
  }

  deleteAllClicked(): void {
    this.appService.deleteAllAplications()
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
  }
}
