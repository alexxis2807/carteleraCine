import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Observable } from 'rxjs';
import { Entrada } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  url = environment.urlEntradaPelicula;
  constructor(private http: HttpClient) {}

  guardarEntradas(
    idSesionPelicula: number,
    asientos: number[],
    idUsuario: number,
    precio: number,
  ): Observable<Entrada[]> {
    const entrada = {
      idSesion: idSesionPelicula,
      asientos,
      idUsuario,
      precio,
    };
    return this.http.post<Entrada[]>(this.url + '/guardar', entrada);
  }
  obtenerEntradasUsuario(idUsuario: number): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(this.url + '/idUsuario/' + idUsuario);
  }
}
