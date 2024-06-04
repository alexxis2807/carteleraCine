import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import {
  Pelicula,
  Sala,
  SesionPelicula,
  SesionPeliculaRequest,
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionPeliculaService {
  private url = environment.urlSesionPeliculas;
  constructor(private http: HttpClient) {}

  guardarSesion(
    peliculaSesion: Pelicula,
    salaSesion: Sala,
    fechaSesion: string,
    horaInicioSesion: string,
    horaFinSesion: string,
    precioSesion: number,
  ): Observable<SesionPeliculaRequest> {
    const sesion: SesionPeliculaRequest = {
      pelicula: peliculaSesion,
      sala: salaSesion,
      fecha: fechaSesion,
      horaInicio: horaInicioSesion,
      horaFin: horaFinSesion,
      precio: precioSesion,
    };

    return this.http.post<SesionPeliculaRequest>(this.url + '/guardar', sesion);
  }

  obtenerSesionesPeliculaFecha(
    fecha: string,
    idPelicula: number,
  ): Observable<SesionPelicula[]> {
    return this.http.get<SesionPelicula[]>(
      this.url + '/fecha/' + fecha + '/id/' + idPelicula,
    );
  }

  obtenerFechasSesionesPeliculas(idPelicula: number): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/fechas/id/' + idPelicula);
  }

  obtenerSesionPelicula(idPelicula: number): Observable<SesionPelicula> {
    return this.http.get<SesionPelicula>(this.url + '/id/' + idPelicula);
  }

  obtenerAsientosOcupados(idSesion: number): Observable<number[]> {
    return this.http.get<number[]>(this.url + '/asientos/idSesion/' + idSesion);
  }
}
