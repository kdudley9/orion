import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationInfo } from "../../pages/application-info/application-info";

@Component({
  selector: 'app-details-container',
  imports: [CommonModule, RouterOutlet, ApplicationInfo],
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
