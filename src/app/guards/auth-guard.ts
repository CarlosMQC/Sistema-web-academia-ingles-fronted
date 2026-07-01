import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const roles = payload.roles || [];
  const expectedRole = route.data['expectedRole'];

  if (expectedRole && !roles.includes(expectedRole)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};