import { Component, OnInit } from '@angular/core';
import { ApiPeliculaService } from '../../servicios/api-pelicula.service';

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
    this.apiService.obtenerPeliculasApi(1).subscribe({
      next: (res) => {
        res.results.forEach((pelicula: any) => {
          this.apiService.obtenerDetallesPelicula(pelicula.id).subscribe({
            next: (peli) => {
              console.log(peli);
            },
          });
        });
      },
    });
  }
}
