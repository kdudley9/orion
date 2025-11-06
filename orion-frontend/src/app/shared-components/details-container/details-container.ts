import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ApplicationInfo } from "../../pages/application-info/application-info";
import { InterviewQuestionPage } from "../../pages/interview-question-page/interview-question-page";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-details-container',
  imports: [CommonModule, RouterOutlet, ApplicationInfo, InterviewQuestionPage, MatIconModule, RouterLinkWithHref],
  templateUrl: './details-container.html',
  styleUrl: './details-container.css'
})
export class DetailsContainer {
  activeTab = 'applicationDetails';

  applicationDetalisTabClicked(activeTab: string): void {
    this.activeTab = activeTab;
  }

  practiceQuestionsTabClicked(activeTab: string): void {
    this.activeTab = activeTab;
  }
}
