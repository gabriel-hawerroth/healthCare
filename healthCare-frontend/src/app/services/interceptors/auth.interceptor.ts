import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilsService } from '../../utils/utils.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next,
  _userService = inject(UserService),
  _utilsService = inject(UtilsService)
) => {
  const requestUrl: Array<string> = request.url.split('/');
  const apiUrl: Array<string> = environment.baseApiUrl.split('/');

  if (requestUrl[2] === apiUrl[2]) {
    const token = _userService.getUserToken;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next(request).pipe(
      catchError((error) => {
        console.log(error);

        if (error.status === 401) {
          _utilsService.showSimpleMessage(
            'Acesso expirado, por favor logue novamente'
          );
          _userService.logout();
        }

        return throwError(() => error);
      })
    );
  } else {
    return next(request);
  }
};
