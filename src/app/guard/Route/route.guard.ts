import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  if (authService.isUserLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
