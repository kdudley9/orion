import { AfterViewInit, Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Application } from '../../models/application';
import { ApplicationListService } from '../../services/application-list-service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RemoveUnderscoresPipe } from "../../pipes/remove-underscores-pipe";
import { PatchRequest } from '../../models/patch-request';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationForm } from '../application-form/application-form';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-application-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RemoveUnderscoresPipe,
    DatePipe,
    TitleCasePipe,
    RouterLink,
    ɵInternalFormsSharedModule
],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard implements AfterViewInit, OnInit {
  private applicationListService = inject(ApplicationListService);
  readonly dialog = inject(MatDialog);
  
  @ViewChild('companyAvatar', { static: false }) elementRef!: ElementRef;
  application = input.required<Application>();
  updateApplicationStatus: any = {};
  logoTextSignal = signal<string | null>('');

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.background = this.applicationListService.companyLogoColor(this.logoTextSignal());
  }

  ngOnInit(): void {
    const logoText = this.applicationListService.companyLogo(this.application().company);
    this.logoTextSignal.set(logoText);
  }

  deleteApplication(applicationId: number | undefined) {
    this.applicationListService.deleteApplication(applicationId).subscribe();
  }

  onUpdateApplication(): void {
    const dialogRef = this.dialog.open(ApplicationForm, {
      data: {
        id: this.application().id,
        company: this.application().company,
        jobTitle: this.application().jobTitle,
        location: this.application().location,
        url: this.application().url,
        dateApplied: this.application().dateApplied,
        industry: this.application().industry,
        jobType: this.application().jobType,
        jobDescription: this.application().jobDescription,
        isUpdate: true
      }
    });

    dialogRef.afterClosed().subscribe(companyName => {
      // Get first char in companyName
      this.logoTextSignal.set(companyName[0]);
    });
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

