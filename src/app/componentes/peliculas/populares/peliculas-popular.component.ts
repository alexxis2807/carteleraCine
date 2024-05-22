import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { DetallePoster, Pelicula } from '../../../interfaces';
import { Router } from '@angular/router';
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

  portadas = [];

  constructor(
    private peliculaService: PeliculasService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    /*  if (!sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/inicioSesion');
    } */

    //Obtengo las peliculas populares
    this.peliculaService.obtenerPosterPeliculasPopulares().subscribe({
      next: (peliculasEncontradas) => {
        this.peliculas = peliculasEncontradas;
        console.log(this.peliculas);
      },
    });
  }
}
