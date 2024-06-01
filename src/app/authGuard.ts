import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './servicios/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  tokenValido = false;

  verificaToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.verificaToken().subscribe({
        next: (result) => {
          resolve(result);
        },
        error: () => {
          resolve(false);
        },
      });
    });
  }

  constructor(
    private authService: AuthService,
    private route: Router,
  ) {}

  async canActive(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (!localStorage.getItem('token') || !localStorage.getItem('Username')) {
      localStorage.removeItem('token');
      localStorage.removeItem('Username');
      window.location.href = 'inicioSesion';
      return false;
    }
    try {
      this.tokenValido = await this.verificaToken();
    } catch (error) {
      console.log('Error verificando el token');
    }
    if (!this.tokenValido) {
      localStorage.removeItem('token');
      localStorage.removeItem('Username');
      window.location.href = 'inicioSesion';
    }

    return this.tokenValido;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Promise<boolean> => {
  return inject(authGuard).canActive(next, state);
};
