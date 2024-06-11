import { Component, OnInit } from '@angular/core';
import { ApiPeliculaService } from '../../servicios/api-pelicula.service';
import { PeliculaApi, Pelicula } from '../../interfaces';
import { PeliculasService } from '../../servicios/peliculas.service';
import { SesionPeliculaService } from '../../servicios/sesion-pelicula.service';
import { SalaService } from '../../servicios/sala.service';

@Component({
  selector: 'app-pelicula-api',
  standalone: true,
  imports: [],
  templateUrl: './pelicula-api.component.html',
  styleUrl: './pelicula-api.component.scss',
})
export class PeliculaApiComponent implements OnInit {
  constructor(
    private apiService: ApiPeliculaService,
    private peliculaServicio: PeliculasService,
    private sesionPeliculaServicio: SesionPeliculaService,
    private salaServicio: SalaService,
  ) {}
  ngOnInit(): void {
    for (let index = 1; index <= 5; index++) {
      this.apiService.obtenerPeliculasApi(index).subscribe({
        next: (peliculas) => {
          peliculas.forEach((pelicula: PeliculaApi) => {
            this.apiService.obtenerDetallesPelicula(pelicula.id).subscribe({
              next: (peli) => {
                this.apiService.obtenerTrailerPelicula(peli.id).subscribe({
                  next: (trailer) => {
                    peli.trailer_path = trailer;
                    if (peli.runtime > 0) {
                      this.apiService.guardarPeliculaBbdd(peli).subscribe({
                        next: (peliculaGuardada) => {
                          console.log(peliculaGuardada);
                        },
                        error: (err) => {
                          console.log(err);
                        },
                      });
                    }
                  },});},});});},});}
  }
  fechaActual = new Date('2024-06-11T09:00:00Z');
  fechaFinal = new Date('2024-06-12T23:59:59Z');
  sala = 1;

  ngOnInity(): void {
    this.peliculaServicio.obtenerPeliculas().subscribe({
      next: (peliculas) => {
        console.log(peliculas.length);
        while (this.fechaActual <= this.fechaFinal) {
          const fechaConstActual = new Date(this.fechaActual);

          this.procesarPeliculas(peliculas);

          this.procesarPeliculas(peliculas.reverse());

          this.fechaActual = this.incrementarDia(fechaConstActual);

          peliculas.sort(() => Math.random() - 0.5);
          this.sala = 1;
        }
      },
    });
  }

  private procesarPeliculas(peliculas: Pelicula[]): void {
    peliculas.forEach((pelicula) => {
      if (this.horaEsValida()) {
        this.procesarPelicula(pelicula);
      } else {
        this.sala++;
        this.resetearFechaParaNuevaSala();
        this.procesarPelicula(pelicula);
      }
    });
  }

  private horaEsValida(): boolean {
    const horaActual = this.fechaActual.getUTCHours();
    const minutosActual = this.fechaActual.getUTCMinutes();
    const segundosActual = this.fechaActual.getUTCSeconds();
    return (
      horaActual > 8 ||
      (horaActual === 8 && minutosActual >= 59 && segundosActual >= 59)
    );
  }

  private procesarPelicula(pelicula: Pelicula): void {
    const horaInicio = this.obtenerHoraActual();
    const fecha = this.obtenerFechaActual();

    this.fechaActual.setMinutes(
      this.fechaActual.getMinutes() + pelicula.duracion,
    );
    const horaFinal = this.obtenerHoraActual();
    const precio = this.generarPrecioAleatorio();

/*     console.log(
      `pelicula: ${pelicula.titulo} horaFinal: ${horaFinal} horainciio: ${horaInicio} sala: ${this.sala} duracion: ${pelicula.duracion} fecha: ${fecha} precio: ${precio}`,
    ); */this.salaServicio.obtenerSala(this.sala).subscribe({
      next: (sala) => {
        this.sesionPeliculaServicio
          .guardarSesion(
            pelicula,
            sala,
            fecha,
            horaInicio,
            horaFinal,
            precio,
          )
          .subscribe({
            next: (sesionGuardada) => {
              console.log(sesionGuardada);
            },
            error: (er) => {
              console.log(er);
            },
          });
      },
    });

    this.fechaActual.setMinutes(this.fechaActual.getMinutes() + 10);
  }

  private resetearFechaParaNuevaSala(): void {
    const fechaActualUTC = new Date(
      this.fechaActual.getTime() + this.fechaActual.getTimezoneOffset() * 60000,
    );
    fechaActualUTC.setHours(9, 0, 0, 0);
    fechaActualUTC.setDate(fechaActualUTC.getDate() - 1);
    this.fechaActual = new Date(
      fechaActualUTC.getTime() - fechaActualUTC.getTimezoneOffset() * 60000,
    );
  }

  private incrementarDia(fechaConstActual: Date): Date {
    const fechaSiguiente = new Date(
      fechaConstActual.getTime() + fechaConstActual.getTimezoneOffset() * 60000,
    );
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
    return new Date(
      fechaSiguiente.getTime() - fechaSiguiente.getTimezoneOffset() * 60000,
    );
  }

  private obtenerHoraActual(): string {
    return this.fechaActual.toUTCString().split(' ')[4];
  }

  private obtenerFechaActual(): string {
    return this.fechaActual.toISOString().split('T')[0];
  }

  private generarPrecioAleatorio(): number {
    return Math.floor(Math.random() * (12 - 6)) + 6.99;
  }


}
