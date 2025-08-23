import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { ApplicationCard } from "../../components/application-card/application-card";

@Component({
  selector: 'app-application-details',
  imports: [ApplicationCard],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css'
})
export class ApplicationDetails implements OnInit {
  applications: Application[] = []
  
  constructor(private applicationDetailsService: ApplicationDetailsService) {}
  
  ngOnInit(): void {
    this.applicationDetailsService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }
}
