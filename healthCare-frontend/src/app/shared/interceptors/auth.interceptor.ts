import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilsService } from '../../utils/utils.service';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next,
  _loginService = inject(LoginService),
  _utilsService = inject(UtilsService)
) => {
  const requestUrl: Array<string> = request.url.split('/');
  const apiUrl: Array<string> = environment.baseApiUrl.split('/');

  if (requestUrl[2] === apiUrl[2]) {
    const token = _loginService.getUserToken;

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
          _loginService.logout();
        }

        return throwError(() => error);
      })
    );
  } else {
    return next(request);
  }
};
