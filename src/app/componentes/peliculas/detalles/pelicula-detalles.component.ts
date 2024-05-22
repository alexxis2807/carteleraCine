import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../assets/environments';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Peliculas } from '../../../interfaces';

@Component({
  selector: 'app-pelicula-detalles',
  standalone: true,
  imports: [],
  templateUrl: './pelicula-detalles.component.html',
  styleUrl: './pelicula-detalles.component.scss',
})
export class PeliculaDetallesComponent implements OnInit {
  urlImagenes = environment.urlApiImagenes;

  idPelicula!: number;
  detallesPelicula!: Peliculas;
  trailerUrl!: SafeResourceUrl;

  constructor(
    private peliculasServicio: PeliculasService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.idPelicula = Number(this.route.snapshot.paramMap.get('idPelicula'));
    this.peliculasServicio.obtenerDetallesPelicula(this.idPelicula).subscribe({
      next: (detalles) => {
        this.detallesPelicula = detalles;
        console.log(this.detallesPelicula.rutaTrailer);
      },
      complete: () => {
        this.obtenerURLSegura();
      },
    });
  }

  obtenerURLSegura() {
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.detallesPelicula.rutaTrailer,
    );
  }
}
