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
    nombreUsuario: string,
    precio: number,
  ): Observable<Entrada[]> {
    const entrada = {
      idSesion: idSesionPelicula,
      asientos,
      nombreUsuario,
      precio,
    };
    return this.http.post<Entrada[]>(this.url + '/guardar', entrada);
  }
  obtenerEntradasUsuario(nombreUsuario: string): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(
      this.url + '/nombreUsuario/' + nombreUsuario,
    );
  }

  eliminarEntrada(idEntrada: number): Observable<void> {
    return this.http.delete<void>(this.url + '/eliminar/' + idEntrada);
  }

  confirmarEntrada(
    idEntrada: number,
    nombreUsuario: string,
  ): Observable<Entrada> {
    return this.http.put<Entrada>(this.url + '/confirmarEntrada', {
      idEntrada,
      nombreUsuario,
    });
  }
}
