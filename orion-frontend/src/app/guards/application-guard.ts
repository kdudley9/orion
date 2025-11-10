import { CanActivateFn, Router } from '@angular/router';
import { ApplicationListService } from '../services/application-list-service';
import { inject } from '@angular/core';

export const applicationGuard: CanActivateFn = (route, state) => {
  const applicationListService = inject(ApplicationListService);
  const router = inject(Router);
  const applicationId = Number(route.paramMap.get('id'));

  applicationListService.getApplication(applicationId).subscribe({
    error: () => {
      router.navigate(['/applications']);
      return false;
    }
  });
  return true;
};
