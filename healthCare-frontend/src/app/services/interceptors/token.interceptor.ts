import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private utilsService: UtilsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userService.getUserToken;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.baseApiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.utilsService.showSimpleMessage(
              'Acesso expirado, por favor logue novamente'
            );
            this.userService.logout();
            return EMPTY;
          } else {
            return throwError(() => new Error(error.message));
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
