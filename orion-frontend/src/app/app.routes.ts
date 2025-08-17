import { Routes } from '@angular/router';
import { ApplicationDetails } from './pages/application-details/application-details';
import { Homepage } from './pages/homepage/homepage';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'applications',
    component: ApplicationDetails,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
