import { Component, OnInit } from '@angular/core';
import { ApiPeliculaService } from '../../servicios/api-pelicula.service';
import { Pelicula } from '../../interfaces';

@Component({
  selector: 'app-pelicula-api',
  standalone: true,
  imports: [],
  templateUrl: './pelicula-api.component.html',
  styleUrl: './pelicula-api.component.scss',
})
export class PeliculaApiComponent implements OnInit {
  constructor(private apiService: ApiPeliculaService) {}

  ngOnInit(): void {
    for (let index = 1; index <= 5; index++) {
      this.apiService.obtenerPeliculasApi(index).subscribe({
        next: (peliculas) => {
          peliculas.forEach((pelicula: Pelicula) => {
            this.apiService.obtenerDetallesPelicula(pelicula.id).subscribe({
              next: (peli) => {
                this.apiService.obtenerTrailerPelicula(peli.id).subscribe({
                  next: (trailer) => {
                    peli.trailer_path = trailer;
                    if (peli.runtime > 0) {
                      this.apiService.guardarPeliculaBbdd(peli).subscribe({
                        next: (peliculaGuardada) => {
                          console.log(peliculaGuardada);
                        },
                        error: (err) => {
                          console.log('error');
                        },
                      });
                    }
                  },
                });
              },
            });
          });
        },
      });
    }
  }
}
