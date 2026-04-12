import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router   = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true; // SSR : laisser passer

  const token = localStorage.getItem('token');

  if (token) {
    return true; // ✅ connecté → accès autorisé
  } else {
    router.navigate(['/login']); // ❌ non connecté → redirect login
    return false;
  }
};