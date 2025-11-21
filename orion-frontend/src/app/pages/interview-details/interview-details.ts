import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Interview } from '../../models/interview';
import { InterviewService } from '../../services/interview-service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InterviewForm } from '../../components/interview-form/interview-form';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RemoveUnderscoresPipe } from '../../pipes/remove-underscores-pipe';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-interview-details',
  imports: [CommonModule, MatIcon, MatIconModule, MatMenu, MatMenuModule, MatIconButton, RemoveUnderscoresPipe],
  templateUrl: './interview-details.html',
  styleUrl: './interview-details.css'
})
export class InterviewDetails implements OnInit {
  readonly dialog = inject(MatDialog);
  private interviewService = inject(InterviewService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  interviews: Interview[] = [];
  interviews$: Observable<Interview[]> = of([]);
  applicationId: number = 0;
  activeTab: string = 'upcoming';
  monthConversionMap: Map<number, string> = new Map([
    [0, 'Jan'],
    [1, 'Feb'],
    [2, 'Mar'],
    [3, 'Apr'],
    [4, 'May'],
    [5, 'Jun'],
    [6, 'Jul'],
    [7, 'Aug'],
    [8, 'Sep'],
    [9, 'Oct'],
    [10, 'Nov'],
    [11, 'Dec']
  ]);

  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.getInterviews();
  }

  getInterviews(): void {
    this.interviewService.getInterviews(this.applicationId).subscribe();
    this.interviews$ = this.interviewService.interviews$;
  }

  openInterviewForm(): void {
    this.dialog.open(InterviewForm, {
      data: { 
        applicationId: this.applicationId,
        isUpdate: false
      }
    });
  }

  deleteInterview(interviewId: number): void {
    this.interviewService.deleteInterview(this.applicationId, interviewId)
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
  }

  onUpdateInterview(interview: Interview): void {
    this.dialog.open(InterviewForm, {
      data: {
        applicationId: this.applicationId,
        interviewId: interview.id,
        interviewDate: interview.interviewDate,
        location: interview.location,
        meetingLink: interview.meetingLink,
        interviewType: interview.interviewType,
        interviewers: interview.interviewers,
        isUpdate: true
      }
    })
  }

  navTabClicked(activeTab: string): void {
    this.activeTab = activeTab;
  }

  isUpcomingInterview(interviewDate: Date): boolean {
    const interviewAsDate = new Date(interviewDate);
    const interviewToUtc = Date.UTC(interviewAsDate.getUTCFullYear(), interviewAsDate.getUTCMonth(), interviewAsDate.getUTCDate());
    const currentTime = new Date().getTime();

    if (currentTime <= interviewToUtc) {
      return true;
    } else {
      return false;
    }
  }

  interviewMonth(interviewDate: Date): string | undefined {
    const interviewAsDate = new Date(interviewDate);
    if (this.monthConversionMap.has(interviewAsDate.getMonth())) {
      return this.monthConversionMap.get(interviewAsDate.getMonth());
    }
    return '';
  }

  interviewDay(interviewDate: Date): number {
    const interviewAsDate = new Date(interviewDate);
    return interviewAsDate.getUTCDate();
  }
}
