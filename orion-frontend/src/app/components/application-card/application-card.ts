import { Component, input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-card',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard {
  application = input.required<Application>();

  constructor(private applicationDetailsService: ApplicationDetailsService, private router: Router) {}

  deleteApplication(applicationId: number) {
    this.applicationDetailsService.deleteApplication(applicationId).subscribe();
  }

  navigateToApplicationDetails(applicationId: number) {
    this.router.navigate([`/applications/${applicationId}`]);
  }
}
