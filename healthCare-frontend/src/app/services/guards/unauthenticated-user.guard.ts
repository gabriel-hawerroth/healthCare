import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../user/user.service';

export const unauthenticatedUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  _userService = inject(UserService),
  _router = inject(Router)
) => {
  if (!_userService.logged) return true;

  _router.navigate(['']);
  return false;
};
