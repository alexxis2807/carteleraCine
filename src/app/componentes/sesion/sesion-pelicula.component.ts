import { Component, OnInit } from '@angular/core';
import { SesionPelicula } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { SesionPeliculaService } from '../../servicios/sesion-pelicula.service';

@Component({
  selector: 'app-sesion-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './sesion-pelicula.component.html',
  styleUrl: './sesion-pelicula.component.scss',
})
export class SesionPeliculaComponent implements OnInit {
  sesionPelicula!: SesionPelicula;
  idSesion!: number;
  asientosOcupados!: number[];

  constructor(
    private route: ActivatedRoute,
    private sesionPeliculaServicio: SesionPeliculaService
  ) {}

  ngOnInit(): void {
    this.idSesion = Number(this.route.snapshot.paramMap.get('idSesion'));
    this.sesionPeliculaServicio.obtenerSesionPelicula(this.idSesion).subscribe({
      next: (sesion) => {
        this.sesionPelicula = sesion;
      }
    });
    this.sesionPeliculaServicio.obtenerAsientosOcupados(this.idSesion).subscribe({
      next: (asientosOcupados) => {
        this.asientosOcupados = asientosOcupados;
      }
    });
  }
}
