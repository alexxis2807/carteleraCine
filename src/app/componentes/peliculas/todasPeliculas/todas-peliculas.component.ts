import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePoster, Pelicula } from '../../../interfaces';
import { PeliculaComponent } from '../cartaPelicula/pelicula.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todas-peliculas',
  standalone: true,
  imports: [PeliculaComponent],
  templateUrl: './todas-peliculas.component.html',
  styleUrl: './todas-peliculas.component.scss',
})
export class TodasPeliculasComponent implements OnInit {
  peliculas!: DetallePoster[];
  constructor(
    private peliculaService: PeliculasService,
    private titleService: Title,
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Películas');
    this.peliculaService
      .obtenerPosterPeliculas()
      .subscribe((pelis) => (this.peliculas = pelis));
  }
}
