import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../assets/environments';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
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

  idPelicula!: number;
  detallesPelicula!: Pelicula;
  trailerUrl!: SafeResourceUrl;
  fechasSesiones!: string[];
  sesionesPorFecha!: SesionPelicula[];
  fechaElegida!: string;

  indiceActual = 0;
  fechasSlider: string[] = [];
  numeroSlider = 5;

  constructor(
    private peliculasServicio: PeliculasService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sesionPeliculaServicio: SesionPeliculaService,
    private titleService: Title,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Detalles');
    this.idPelicula = Number(this.route.snapshot.paramMap.get('idPelicula'));
    this.peliculasServicio
      .obtenerDetallesPelicula(this.idPelicula)
      .subscribe((data) => {
        this.detallesPelicula = data;
        if (this.detallesPelicula) {
          this.obtenerURLSegura();
          this.obtenerFechasSesiones(data.id);
        } else {
          this.router.navigateByUrl('peliculas');
        }
      });
  }

  obtenerURLSegura(): void {
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.detallesPelicula.rutaTrailer,
    );
  }

  obtenerFechasSesiones(idPelicula: number): void {
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
          this.actualizarFechasSlider();
        },
      });
  }

  obtenerSesionesPorFecha(fecha: string, idPelicula: number): void {
    this.sesionPeliculaServicio
      .obtenerSesionesPeliculaFecha(fecha, idPelicula)
      .subscribe({
        next: (sesiones) => {
          this.sesionesPorFecha = sesiones;
          this.fechaElegida = fecha;
        },
      });
  }

  obtenerSiguientesFechas(indiceActual: number): string[] {
    const siguientesFechas = [];
    for (let i = 0; i < this.numeroSlider; i++) {
      const siguienteIndice = (indiceActual + i) % this.fechasSesiones.length;
      siguientesFechas.push(this.fechasSesiones[siguienteIndice]);
    }
    return siguientesFechas;
  }

  navegar(direccion: number): void {
    this.indiceActual =
      (this.indiceActual + direccion + this.fechasSesiones.length) %
      this.fechasSesiones.length;
    this.actualizarFechasSlider();
  }

  actualizarFechasSlider(): void {
    this.fechasSlider = this.obtenerSiguientesFechas(this.indiceActual);
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  reajustarSlider(): void {
    const numeroSliderActual = this.numeroSlider;
    if (window.innerWidth <= 450) {
      this.numeroSlider = 1;
    } else if (window.innerWidth <= 600) {
      this.numeroSlider = 2;
    } else if (window.innerWidth <= 750) {
      this.numeroSlider = 3;
    } else if (window.innerWidth <= 900) {
      this.numeroSlider = 4;
    } else {
      this.numeroSlider = 5;
    }
    if (this.numeroSlider != numeroSliderActual) {
      this.actualizarFechasSlider();
    }
  }
}
