import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginWithGoogle();
  }
}
