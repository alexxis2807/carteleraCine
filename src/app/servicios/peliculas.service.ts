import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PeliculaApi, Pelicula } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private url = environment.urlPeliculasBbdd;

  private peliculasSubject = new BehaviorSubject<Pelicula[]>([]);
  private popularesSubject = new BehaviorSubject<Pelicula[]>([]);
  private detallesSubject = new BehaviorSubject<{ [id: number]: Pelicula }>({});

  peliculas$ = this.peliculasSubject.asObservable();
  populares$ = this.popularesSubject.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public obtenerDetallesPelicula(idPelicula: number): Observable<Pelicula> {
    if (!this.detallesSubject.value[idPelicula]) {
      this.http
        .get<Pelicula>(this.url + '/detalles/' + idPelicula)
        .pipe(
          tap((detalle) => {
            const detalles = this.detallesSubject.value;
            detalles[idPelicula] = detalle;
            this.detallesSubject.next(detalles);
          }),
        )
        .subscribe({
          error: () => {
            this.router.navigateByUrl('peliculas');
          },
        });
    }
    return this.detallesSubject
      .asObservable()
      .pipe(map((detalles) => detalles[idPelicula]));
  }

  public obtenerPosterPeliculas(): Observable<Pelicula[]> {
    if (this.peliculasSubject.value.length === 0) {
      this.http
        .get<Pelicula[]>(this.url + '/posters')
        .pipe(tap((peliculas) => this.peliculasSubject.next(peliculas)))
        .subscribe();
    }
    return this.peliculas$;
  }

  public obtenerPosterPeliculasPopulares(): Observable<Pelicula[]> {
    if (this.popularesSubject.value.length === 0) {
      this.http
        .get<Pelicula[]>(this.url + '/posters/populares')
        .pipe(tap((peliculas) => this.popularesSubject.next(peliculas)))
        .subscribe();
    }
    return this.populares$;
  }

  public obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.url + '/detalles');
  }
}
