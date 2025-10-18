import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationInfo } from "../../pages/application-info/application-info";
import { InterviewQuestionPage } from "../../pages/interview-question-page/interview-question-page";

@Component({
  selector: 'app-details-container',
  imports: [CommonModule, RouterOutlet, ApplicationInfo, InterviewQuestionPage],
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
