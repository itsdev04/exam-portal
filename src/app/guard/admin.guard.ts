import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  // Check if the user is logged in AND has the ADMIN role
  if (loginService.isUserLoggedIn() && loginService.getuserRole() == "ADMIN") {
    return true; // Allow navigation to the route
  }

  // If not, cancel the current navigation and redirect to the login page
  return router.createUrlTree(['/login']);
};

