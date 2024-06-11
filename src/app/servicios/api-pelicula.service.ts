import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { PeliculaApi, Pelicula, PeliculaApiResultado } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiPeliculaService {
  private urlDiscover = environment.urlApiPeliculasDiscover;
  private urlPelicula = environment.urlApiPeliculas;
  private urlPeliculaBbdd = environment.urlPeliculasBbdd;

  private token = environment.tokenPeliculas;
  private headersAuthoritation = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`,
  );

  constructor(private http: HttpClient) {}

  public obtenerPeliculasApi(pagina: number): Observable<PeliculaApi[]> {
    return this.http
      .get<PeliculaApiResultado>(
        this.urlDiscover +
          '?include_adult=false&include_video=false&language=es-ES&page=' +
          pagina +
          '&sort_by=popularity.desc',
        { headers: this.headersAuthoritation },
      )
      .pipe(map((resultados) => resultados.results));
  }

  obtenerTrailerPelicula(idPelicula: number): Observable<string> {
    return this.http
      .get<string>(
        this.urlPelicula + '/' + idPelicula + '/videos?language=es-ES',
        {
          headers: this.headersAuthoritation,
        },
      )
      .pipe(
        map((response: any) => {
          const trailerEsp = response.results[0].key;
          if (trailerEsp) {
            return trailerEsp;
          } else {
            throw new Error('No hay trailer en Español');
          }
        }),
        catchError(() => {
          return this.http
            .get<string>(
              this.urlPelicula + '/' + idPelicula + '/videos?language=en-EN',
              {
                headers: this.headersAuthoritation,
              },
            )
            .pipe(
              map((response: any) => {
                const trailerIng = response.results[0].key;
                if (trailerIng) {
                  return trailerIng;
                } else {
                  throw new Error('No hay trailer en Ingles');
                }
              }),
              catchError(() => of('')),
            );
        }),
      );
  }

  public obtenerDetallesPelicula(idPelicula: number): Observable<PeliculaApi> {
    return this.http.get<PeliculaApi>(
      this.urlPelicula + '/' + idPelicula + '?language=es-ES',
      { headers: this.headersAuthoritation },
    );
  }

  public guardarPeliculaBbdd(pelicula: PeliculaApi) {
    return this.http.post(this.urlPeliculaBbdd + '/agregar', pelicula);
  }
}
