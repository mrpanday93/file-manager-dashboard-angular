import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inject:Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authservice=this.inject.get(AuthenticationService);
    
    let jwtToken = request.clone({
      setHeaders: {
        Authorization: 'Bearer '+authservice.getToken()
      }
    });
    return next.handle(jwtToken);
  }
}
