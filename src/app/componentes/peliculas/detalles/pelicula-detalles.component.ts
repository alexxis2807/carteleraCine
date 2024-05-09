import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pelicula-detalles',
  standalone: true,
  imports: [],
  templateUrl: './pelicula-detalles.component.html',
  styleUrl: './pelicula-detalles.component.scss',
})
export class PeliculaDetallesComponent implements OnInit {
  idPelicula!: number;
  detallesPelicula: any;

  constructor(
    private peliculasServicio: PeliculasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.idPelicula = Number(this.route.snapshot.paramMap.get('idPelicula'));
    this.peliculasServicio.obtenerDetallesPelicula(this.idPelicula).subscribe({
      next: (detalles) => {
        this.detallesPelicula = detalles;
        console.log(this.detallesPelicula);
      },
    });
  }
}
