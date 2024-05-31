import { Injectable } from '@angular/core';
import { environment } from '../../../assets/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlVerificaToken = environment.urlVerificaToken;

  constructor(private http: HttpClient) {}

  verificaToken(): Observable<boolean> {
    return this.http.get<boolean>(this.urlVerificaToken);
  }
}
