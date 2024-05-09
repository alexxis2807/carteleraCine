import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { Pelicula } from '../../../interfaces';
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
  peliculas!: Pelicula[];

  portadas = [];

  constructor(
    private peliculaService: PeliculasService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    /*  if (!sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/inicioSesion');
    } */

    //Obtengo las peliculas de la pagina 1
    this.peliculaService.obtenerPeliculas(1).subscribe({
      next: (peliculasEncontrada) => {
        peliculasEncontrada.map((pelicula) => {
          this.peliculaService.obtenerPortadaPelicula(pelicula.id).subscribe({
            next: (portada) => {
              if (portada != undefined) {
                pelicula.backdrop_path = portada;
              }
            },
          });
        });
        this.peliculas = peliculasEncontrada.filter(
          (pelicula) => pelicula.backdrop_path != null,
        );
        console.log(this.peliculas);
      },
    });
  }
}
