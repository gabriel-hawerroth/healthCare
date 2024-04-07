import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../services/login.service';

export const unauthenticatedUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  _loginService = inject(LoginService),
  _router = inject(Router)
) => {
  if (!_loginService.logged) return true;

  _router.navigate(['']);
  return false;
};
