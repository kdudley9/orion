import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginWithGoogle();
  }
}
