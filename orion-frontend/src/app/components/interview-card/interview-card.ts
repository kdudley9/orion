import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterviewService } from '../../services/interview-service';
import { UpcomingInterview } from '../../models/interview';
import { AsyncPipe } from '@angular/common';
import { RemoveUnderscoresPipe } from '../../pipes/remove-underscores-pipe';

@Component({
  selector: 'app-interview-card',
  imports: [AsyncPipe, RemoveUnderscoresPipe],
  templateUrl: './interview-card.html',
  styleUrl: './interview-card.css'
})
export class InterviewCard implements OnInit {
  private interviewService = inject(InterviewService);

  upcomingInterview$: Observable<UpcomingInterview> = of();
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
    this.upcomingInterview$ = this.interviewService.getUpcomingInterview();
  }

  interviewMonth(interviewDate: Date): string | undefined {
    const interviewAsDate: Date = new Date(interviewDate);
    return this.monthConversionMap.get(interviewAsDate.getMonth());
  }

  interviewDay(interviewDate: Date): number {
    const interviewAsDate: Date = new Date(interviewDate);
    return interviewAsDate.getUTCDate();
  }
}
