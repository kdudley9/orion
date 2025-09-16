import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { ApplicationDetailsService } from '../../services/application-details-service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-application-info',
  imports: [],
  templateUrl: './application-info.html',
  styleUrl: './application-info.css'
})
export class ApplicationInfo implements OnInit {
  applicationId: number = 0;
  application: Application = {
    id: 0,
    company: '',
    jobTitle: '',
    location: '',
    url: '',
    dateApplied: '',
    industry: '',
    status: '',
    jobType: '',
    favorite: false,
    archived: false
  }

  constructor(private applicationDetailsService: ApplicationDetailsService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.applicationDetailsService.getApplication(this.applicationId).subscribe((data) => {
      this.application = data;
    });
  }
}
