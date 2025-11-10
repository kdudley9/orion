import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ApplicationInfo } from "../../pages/application-info/application-info";
import { InterviewQuestionPage } from "../../pages/interview-question-page/interview-question-page";
import { MatIconModule } from "@angular/material/icon";
import { InterviewDetails } from "../../pages/interview-details/interview-details";

@Component({
  selector: 'app-details-container',
  imports: [CommonModule, RouterOutlet, ApplicationInfo, InterviewQuestionPage, MatIconModule, RouterLinkWithHref, InterviewDetails],
  templateUrl: './details-container.html',
  styleUrl: './details-container.css'
})
export class DetailsContainer {
  applicationDetails = {
    activeTab: 'applicationDetails',
    header: 'Application Details',
    pageInfo: 'See detailed information about this application.'
  }

  interviewDetails = {
    activeTab: 'interviewDetails',
    header: 'Interviews',
    pageInfo: 'Keep track of your upcoming and past interviews'
  }

  practiceQuestions = {
    activeTab: 'practiceQuestions',
    header: 'Practice Questions',
    pageInfo: `Prepare for interviews with personalized practice questions. Generate AI-based
    questions or add your own.`
  }

  header = signal<string>(this.applicationDetails.header);
  pageInfo = signal<string>(this.applicationDetails.pageInfo)
  activeTab: string = this.applicationDetails.activeTab;

  navTabClicked(newTab: string): void {
    this.activeTab = newTab;
    switch(this.activeTab) {
      case this.applicationDetails.activeTab:
        this.header.set(this.applicationDetails.header);
        this.pageInfo.set(this.applicationDetails.pageInfo);
        break;
      case this.interviewDetails.activeTab:
        this.header.set(this.interviewDetails.header);
        this.pageInfo.set(this.interviewDetails.pageInfo);
        break;
      case this.practiceQuestions.activeTab:
        this.header.set(this.practiceQuestions.header);
        this.pageInfo.set(this.practiceQuestions.pageInfo);
        break;
    }
  }
}
