import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  if (!authService.isUserLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};
