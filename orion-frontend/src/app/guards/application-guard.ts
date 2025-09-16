import { CanActivateFn, Router } from '@angular/router';
import { ApplicationDetailsService } from '../services/application-details-service';
import { inject } from '@angular/core';

export const applicationGuard: CanActivateFn = (route, state) => {
  const applicationDetailsService = inject(ApplicationDetailsService);
  const router = inject(Router);
  const applicationId = Number(route.paramMap.get('id'));

  applicationDetailsService.getApplication(applicationId).subscribe({
    error: () => {
      router.navigate(['/applications']);
      return false;
    }
  });
  return true;
};
