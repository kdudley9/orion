import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-application-info',
  imports: [RemoveUnderscoresPipe, MatIcon, MatIconModule],
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

  @ViewChild('companyAvatar', { static: false }) elementRef!: ElementRef;
  logoText: string | null = null;
  
  constructor(private applicationListService: ApplicationListService, private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.applicationListService.getApplication(this.applicationId).subscribe((data) => {
      this.application = data;
      this.logoText = this.applicationListService.companyLogo(this.application.company);
      this.elementRef.nativeElement.style.background = this.applicationListService.companyLogoColor(this.logoText);
    });
  }
}
