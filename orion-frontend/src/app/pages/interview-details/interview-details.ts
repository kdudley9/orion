import { Component, inject, OnInit } from '@angular/core';
import { Interview } from '../../models/interview';
import { InterviewService } from '../../services/interview-service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InterviewForm } from '../../components/interview-form/interview-form';

@Component({
  selector: 'app-interview-details',
  imports: [],
  templateUrl: './interview-details.html',
  styleUrl: './interview-details.css'
})
export class InterviewDetails implements OnInit {
  interviews: Interview[] = [];
  applicationId: number = 0;
  readonly dialog = inject(MatDialog)

  constructor(private interviewService: InterviewService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.applicationId = Number(this.route.parent?.snapshot.params['id']);
    this.interviewService.getInterviews(this.applicationId).subscribe((data) => {
      this.interviews = data;
    });
  }

  openInterviewForm(applicationId: number): void {
    this.dialog.open(InterviewForm, {
      data: { applicationId }
    });
  }

  deleteInterview(interviewId: number): void {
    this.interviewService.deleteInterview(this.applicationId, interviewId).subscribe();
  }
}
