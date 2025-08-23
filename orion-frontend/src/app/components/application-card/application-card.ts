import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Application } from '../../models/application';

@Component({
  selector: 'app-application-card',
  imports: [MatIcon],
  templateUrl: './application-card.html',
  styleUrl: './application-card.css'
})
export class ApplicationCard {
  application = input.required<Application>();
}
