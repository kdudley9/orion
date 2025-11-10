import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-application-info',
  imports: [RemoveUnderscoresPipe, DatePipe, TitleCasePipe, MatIcon, MatIconModule],
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

  @ViewChild('status', { static: false }) statusElementRef!: ElementRef;
  @ViewChild('companyAvatar', { static: false }) avatarElementRef!: ElementRef;
  logoText: string | null = null;
  
  constructor(private applicationListService: ApplicationListService, private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.applicationId = Number(this.route.snapshot.params['id']);
    this.applicationListService.getApplication(this.applicationId).subscribe((data) => {
      this.application = data;
      this.logoText = this.applicationListService.companyLogo(this.application.company);
      this.avatarElementRef.nativeElement.style.background = this.applicationListService.companyLogoColor(this.logoText);
      this.statusColors(this.application.status);
    });
  }

  statusColors(status: string | undefined): void {
    let statusStyle = this.statusElementRef.nativeElement.style;

    switch(status) {
      case 'APPLIED':
        statusStyle.background = 'var(--applied-background)';
        statusStyle.color = 'var(--applied-text)';
        break;
      case 'ONLINE_ASSESSMENT':
        statusStyle.background = 'var(--assessment-background)';
        statusStyle.color = 'var(--assessment-text)';
        break;
      case 'INTERVIEW':
        statusStyle.background = 'var(--interview-background)';
        statusStyle.color = 'var(--interview-text)';
        break;
      case 'OFFER':
        statusStyle.background = 'var(--offer-background)';
        statusStyle.color = 'var(--offer-text)';
        break;
      case 'REJECTED':
        statusStyle.background = 'var(--rejected-background)';
        statusStyle.color = 'var(--rejected-text)';
        break;
      case 'GHOSTED':
        statusStyle.background = 'var(--ghosted-background)';
        statusStyle.color = 'var(--ghosted-text)';
        break;
    }
  }
}
