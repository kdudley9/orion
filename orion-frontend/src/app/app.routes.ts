import { Routes } from '@angular/router';
import { ApplicationDetails } from './pages/application-details/application-details';
import { Homepage } from './pages/homepage/homepage';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { ApplicationInfo } from './pages/application-info/application-info';
import { applicationGuard } from './guards/application-guard';
import { InterviewDetails } from './pages/interview-details/interview-details';
import { InterviewQuestionPage } from './pages/interview-question-page/interview-question-page';
import { DetailsContainer } from './shared-components/details-container/details-container';

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
    component: DetailsContainer,
    canActivate: [authGuard, applicationGuard],
    children: [
      { path: 'interviews', component: InterviewDetails }
    ]
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
