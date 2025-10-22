import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Interview } from '../../models/interview';
import { InterviewService } from '../../services/interview-service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InterviewForm } from '../../components/interview-form/interview-form';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-interview-details',
  imports: [CommonModule],
  templateUrl: './interview-details.html',
  styleUrl: './interview-details.css'
})
export class InterviewDetails implements OnInit {
  interviews: Interview[] = [];
  interviews$: Observable<Interview[]> = of([]);
  applicationId: number = 0;
  readonly dialog = inject(MatDialog);
  private interviewService = inject(InterviewService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.applicationId = Number(this.route.parent?.snapshot.params['id']);
    this.getInterviews();
  }

  getInterviews(): void {
    this.interviewService.getInterviews(this.applicationId).subscribe();
    this.interviews$ = this.interviewService.interviews$;
  }

  openInterviewForm(applicationId: number): void {
    this.dialog.open(InterviewForm, {
      data: { applicationId }
    });
  }

  deleteInterview(interviewId: number): void {
    this.interviewService.deleteInterview(this.applicationId, interviewId)
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
  }
}
