import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Sala } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private url = environment.urlSala;
  constructor(private http: HttpClient) {}

  public obtenerSala(idSala: number): Observable<Sala> {
    return this.http.get<Sala>(this.url + '/' + idSala);
  }
}
