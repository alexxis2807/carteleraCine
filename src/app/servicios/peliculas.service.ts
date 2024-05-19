import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Observable, map } from 'rxjs';
import { Pelicula } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private url = environment.urlApiPeliculas;
  private token = environment.tokenPeliculas;
  private headersAuthoritation = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`,
  );

  private urlImagenes = environment.urlApiImagenes;

  constructor(private http: HttpClient) {}

  public obtenerPeliculas(numPagina: number): Observable<Pelicula[]> {
    return this.http
      .get<{
        results: Pelicula[];
      }>(this.url + '/popular?language=es-ES&page=' + numPagina, {
        headers: this.headersAuthoritation,
      })
      .pipe(
        map((response) => response.results),
      );
  }

  public obtenerPortadaPelicula(idPelicula: number): Observable<any> {
    return this.http
      .get<any>(
        this.url + '/' + idPelicula + '/images?include_image_language=es',
        {
          headers: this.headersAuthoritation,
        },
      )
      .pipe(
        map((respuesta) => {
          const pathPosters = respuesta.posters.map(
            (poster: any) => poster.file_path,
          );
          return pathPosters[0];
        }),
      );
  }

  public obtenerDetallesPelicula(idPelicula: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(
      this.url + '/' + idPelicula + '?language=es-ES',
      {
        headers: this.headersAuthoritation,
      },
    );
  }

  public obtenerTrailerPelicula(idPelicula: number): Observable<string> {
    return this.http
      .get<string>(this.url + '/' + idPelicula + '/videos?language=es-ES', {
        headers: this.headersAuthoritation,
      })
      .pipe(
        map((response: any) => {
          return response.results[0].key;
        }),
      );
  }
}
