import { Component, Input } from '@angular/core';
import { environment } from '../../../../assets/environments';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.scss',
})
export class PeliculaComponent {
  urlImagenes = environment.urlApiImagenes;

  @Input() urlPortadaPelicula!: string;
  @Input() tituloPelicula!: string;
  @Input() idPelicula!: number;
}
