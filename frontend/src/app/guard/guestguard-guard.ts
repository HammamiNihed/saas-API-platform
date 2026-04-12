import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../core/services/auth';

export const guestguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  const token = auth.getUser();

  // si connecté → rediriger vers dashboard
  if (token) {
    router.navigate(['/projects']);
    return false;
  }

  return true;
};