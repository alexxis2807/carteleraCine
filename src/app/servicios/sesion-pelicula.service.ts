import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Peliculas, Sala, SesionPelicula } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionPeliculaService {
  private url = environment.urlSesionPeliculas;
  constructor(private http: HttpClient) {}

  guardarSesion(
    peliculaSesion: Peliculas,
    salaSesion: Sala,
    fechaSesion: string,
    horaInicioSesion: string,
    horaFinSesion: string,
  ): Observable<SesionPelicula> {
    const sesion: SesionPelicula = {
      pelicula: peliculaSesion,
      sala: salaSesion,
      fecha: fechaSesion,
      horaInicio: horaInicioSesion,
      horaFin: horaFinSesion,
    };

    return this.http.post<SesionPelicula>(this.url + '/guardar', sesion);
  }

  obtenerSesionesPeliculaFecha(
    fecha: string,
    idPelicula: number,
  ): Observable<SesionPelicula[]> {
    return this.http.get<SesionPelicula[]>(
      this.url + '/fecha/' + fecha + '/id/' + idPelicula,
    );
  }

  obtenerFechasSesionesPeliculas(
    idPelicula: number,
  ): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/id/' + idPelicula);
  }
}
