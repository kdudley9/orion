import { Routes } from '@angular/router';
import { ApplicationDetails } from './pages/application-details/application-details';
import { Homepage } from './pages/homepage/homepage';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { ApplicationInfo } from './pages/application-info/application-info';
import { applicationGuard } from './guards/application-guard';

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
    path: 'applications/:id',
    component: ApplicationInfo,
    canActivate: [authGuard, applicationGuard]
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
