import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const jwt = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('Username');

    if (jwt && username) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
          Username: `${username}`,
        },
      });
    }
    return next.handle(request);
  }
}
