import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedUserGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('system');
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const unauthenticatedUserGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('system');
  const router = inject(Router);

  if (!token) {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};

