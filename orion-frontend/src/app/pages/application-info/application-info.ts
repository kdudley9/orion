import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-application-info',
  imports: [RemoveUnderscoresPipe, MatIcon],
  templateUrl: './application-info.html',
  styleUrl: './application-info.css'
})
export class ApplicationInfo {
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
  
  constructor(private applicationListService: ApplicationListService, private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.applicationListService.getApplication(this.applicationId).subscribe((data) => {
      this.application = data;
    });
  }
}
