import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Observable, map } from 'rxjs';
import { Pelicula, Peliculas } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private url = environment.urlPeliculasBbdd;
  private urlImagenes = environment.urlApiImagenes;

  constructor(private http: HttpClient) {}

  public obtenerPosterPeliculas(): Observable<Peliculas[]> {
    return this.http.get<Peliculas[]>(this.url + '/posters');
  }

  public obtenerDetallesPelicula(idPelicula: number): Observable<Peliculas> {
    return this.http.get<Peliculas>(this.url + '/detalles/' + idPelicula);
  }
}
