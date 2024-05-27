import { Component, OnInit } from '@angular/core';
import { SesionPelicula } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idSesion = Number(this.route.snapshot.paramMap.get('idSesion'));
  }
}
