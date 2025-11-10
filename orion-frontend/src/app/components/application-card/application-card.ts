import { AfterViewInit, Component, ElementRef, inject, input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { PatchRequest } from '../../models/patch-request';

@Component({
  selector: 'app-application-card',
  imports: [
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    RemoveUnderscoresPipe, 
    DatePipe, 
    TitleCasePipe,
    RouterLink],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard implements AfterViewInit, OnInit {
  private applicationListService = inject(ApplicationListService);
  
  @ViewChild('companyAvatar', { static: false }) elementRef!: ElementRef;
  application = input.required<Application>();
  updateApplicationStatus: any = {};
  logoText: string | null = null;

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.background = this.applicationListService.companyLogoColor(this.logoText);
  }

  ngOnInit(): void {
    this.logoText = this.applicationListService.companyLogo(this.application().company);
  }

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

