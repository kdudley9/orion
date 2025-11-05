import { AfterViewInit, Component, ElementRef, inject, input, OnInit, ViewChild } from '@angular/core';
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
export class ApplicationCard implements AfterViewInit, OnInit {
  private applicationListService = inject(ApplicationListService);
  
  @ViewChild('companyAvatar', { static: false }) elementRef!: ElementRef;
  application = input.required<Application>();
  updateApplicationStatus: any = {};
  logoText: string = '0';

  ngAfterViewInit(): void {
    this.setCompanyLogoColor();
  }

  ngOnInit(): void {
    this.setCompanyLogo();
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

  setCompanyLogo() {
    let companyNameFirstChar: string = this.application().company[0];

    if (this.isLetterOrDigit(companyNameFirstChar)) {
      this.logoText = companyNameFirstChar;
    }
  }

  setCompanyLogoColor() {
    const logoChar = this.elementRef.nativeElement.textContent;

    const gradientMap = new Map([
      [0, 'linear-gradient(#3B82F6, #6366F1)'],
      [1, 'linear-gradient(#06B6D4, #0D9488)'],
      [2, 'linear-gradient(#F97316, #FACC15)'],
      [3, 'linear-gradient(#FB7185, #EC4899)'],
      [4, 'linear-gradient(#10B981, #84CC16)'],
      [5, 'linear-gradient(#14B8A6, #3B82F6)'],
      [6, 'linear-gradient(#9CA3AF, #64748B)'],
      [7, 'linear-gradient(#8B5CF6, #A855F7)']
    ]);

    const colorKey = logoChar.charCodeAt(0) % gradientMap.size;
    this.elementRef.nativeElement.style.background = gradientMap.get(colorKey);
  }

  isLetterOrDigit(str: string): boolean {
    const alphaNumericRegex: RegExp = /[a-zA-Z0-9]/;
    return alphaNumericRegex.test(str);
  }
}

