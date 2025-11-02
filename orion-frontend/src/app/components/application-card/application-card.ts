import { Component, inject, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { PatchRequest } from '../../models/patch-request';

@Component({
  selector: 'app-application-card',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RemoveUnderscoresPipe, DatePipe, RouterLink],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard {
  private applicationListService = inject(ApplicationListService);
  
  application = input.required<Application>();
  updateApplicationStatus: any = {};

  deleteApplication(applicationId: number | undefined) {
    this.applicationListService.deleteApplication(applicationId).subscribe();
  }

  onPatchApplication(applicationId: number | undefined, updatedStatus: string): void {
    const patchRequest: PatchRequest[] = [{
      op: "replace",
      path: "/status",
      value: updatedStatus
    }];
    this.applicationListService.patchApplication(patchRequest, applicationId).subscribe();
  }
}
