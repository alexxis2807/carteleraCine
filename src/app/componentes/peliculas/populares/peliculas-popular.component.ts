import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePoster, PeliculaApi } from '../../../interfaces';
import { PeliculaComponent } from '../cartaPelicula/pelicula.component';

@Component({
  selector: 'app-peliculas-popular',
  standalone: true,
  templateUrl: './peliculas-popular.component.html',
  styleUrl: './peliculas-popular.component.scss',
  imports: [PeliculaComponent],
})
export class PeliculasPopularComponent implements OnInit {
  peliculas!: DetallePoster[];
  
  constructor(private peliculaService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculaService
      .obtenerPosterPeliculasPopulares()
      .subscribe((pelis) => (this.peliculas = pelis));
  }
}
