import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../assets/environments';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pelicula, SesionPelicula } from '../../../interfaces';
import { SesionPeliculaService } from '../../../servicios/sesion-pelicula.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pelicula-detalles',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pelicula-detalles.component.html',
  styleUrl: './pelicula-detalles.component.scss',
})
export class PeliculaDetallesComponent implements OnInit {
  urlImagenes = environment.urlApiImagenes;

  modalActivado = false;

  idPelicula!: number;
  detallesPelicula!: Pelicula;
  trailerUrl!: SafeResourceUrl;
  fechasSesiones!: string[];
  sesionesPorFecha!: SesionPelicula[];
  fechaElegida!: string;

  constructor(
    private peliculasServicio: PeliculasService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sesionPeliculaServicio: SesionPeliculaService,
  ) {}

  ngOnInit(): void {
    this.idPelicula = Number(this.route.snapshot.paramMap.get('idPelicula'));
    this.peliculasServicio
      .obtenerDetallesPelicula(this.idPelicula)
      .subscribe((data) => {
        this.detallesPelicula = data;
        this.obtenerURLSegura();
        this.obtenerFechasSesiones(data.id);
      });
  }

  obtenerURLSegura() {
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.detallesPelicula.rutaTrailer,
    );
  }

  obtenerFechasSesiones(idPelicula: number) {
    this.sesionPeliculaServicio
      .obtenerFechasSesionesPeliculas(idPelicula)
      .subscribe({
        next: (fechas) => {
          this.fechasSesiones = fechas;
        },
        complete: () => {
          this.obtenerSesionesPorFecha(
            this.fechasSesiones[0],
            this.detallesPelicula.id,
          );
        },
      });
  }

  obtenerSesionesPorFecha(fecha: string, idPelicula: number) {
    this.sesionPeliculaServicio
      .obtenerSesionesPeliculaFecha(fecha, idPelicula)
      .subscribe({
        next: (sesiones) => {
          this.sesionesPorFecha = sesiones;
          this.fechaElegida = fecha;
        },
      });
  }
}
