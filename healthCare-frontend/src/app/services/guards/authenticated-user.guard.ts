import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../user/login.service';

export const authenticatedUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  _loginService = inject(LoginService),
  _router = inject(Router)
) => {
  if (_loginService.logged) return true;

  _router.navigate(['login']);
  return false;
};
