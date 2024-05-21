import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePoster, Peliculas } from '../../../interfaces';
import { PeliculaComponent } from '../cartaPelicula/pelicula.component';

@Component({
  selector: 'app-todas-peliculas',
  standalone: true,
  imports: [PeliculaComponent],
  templateUrl: './todas-peliculas.component.html',
  styleUrl: './todas-peliculas.component.scss',
})
export class TodasPeliculasComponent implements OnInit {
  peliculas!: any;
  constructor(private peliculaService: PeliculasService) {}
  ngOnInit(): void {
    this.peliculaService.obtenerPosterPeliculas().subscribe({
      next: (pelis) => {
        console.log(pelis);
        this.peliculas = pelis;
      },
    });
  }
}
