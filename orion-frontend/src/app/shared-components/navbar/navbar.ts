import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatIcon, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  user: User | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
      }
    );
  }

  navigateToApplications(): void {
    this.router.navigate(['/applications']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
