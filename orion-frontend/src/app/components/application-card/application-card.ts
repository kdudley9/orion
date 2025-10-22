import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { DropdownService } from '../../services/dropdown-service';
import { PatchRequest } from '../../models/patch-request';

@Component({
  selector: 'app-application-card',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RemoveUnderscoresPipe, DatePipe, RouterLink],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard implements OnInit {
  application = input.required<Application>();
  statuses = [];
  updateApplicationStatus: any = {};

  constructor(
    private applicationDetailsService: ApplicationDetailsService,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  deleteApplication(applicationId: number | undefined) {
    this.applicationDetailsService.deleteApplication(applicationId).subscribe();
  }

  getStatuses(): void {
    this.dropdownService.getStatuses().subscribe((data) => {
      this.statuses = data
    });
  }

  onPatchApplication(applicationId: number | undefined, updatedStatus: string): void {
    const patchRequest: PatchRequest[] = [{
      op: "replace",
      path: "/status",
      value: updatedStatus
    }];
    this.applicationDetailsService.patchApplication(patchRequest, applicationId).subscribe();
  }
}
