import { Component, OnInit } from '@angular/core';
import { ApiPeliculaService } from '../../servicios/api-pelicula.service';
import { Pelicula, Peliculas } from '../../interfaces';
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

  fechaActual = new Date('2024-06-13T09:00:00Z');
  fechaFinal = new Date('2024-06-28T23:59:59Z');
  sala = 1;

  ngOnInit(): void {
    this.peliculaServicio.obtenerPeliculas().subscribe({
      next: (peliculas) => {
        let cont = 0;
        while (this.fechaActual <= this.fechaFinal) {
          const fechaConstActual = new Date(this.fechaActual);
          this.sala = 1;
          cont = 0;
          peliculas.forEach((pelicula) => {
            const horaActual = this.fechaActual.getUTCHours();
            const minutosActual = this.fechaActual.getUTCMinutes();
            const segundosActual = this.fechaActual.getUTCSeconds();
            if (
              horaActual > 8 ||
              (horaActual === 8 && minutosActual > 59) ||
              (horaActual === 8 && minutosActual === 59 && segundosActual > 59)
            ) {
              const horaInicio = this.fechaActual.toUTCString().split(' ')[4];
              const fecha = this.fechaActual.toISOString().split('T')[0];

              this.fechaActual.setMinutes(
                this.fechaActual.getMinutes() + pelicula.duracion,
              );
              const horaFinal = this.fechaActual.toUTCString().split(' ')[4];

              /* const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
              console.log(
                'pelicula: ' +
                  pelicula.titulo +
                  ' horaFinal: ' +
                  horaFinal +
                  ' horainciio:; ' +
                  horaInicio +
                  ' sala: ' +
                  this.sala +
                  ' duracion: ' +
                  pelicula.duracion +
                  ' fecha: ' +
                  fecha +
                  ' precio: ' +
                  precio,
              ); */

              /* this.salaServicio.obtenerSala(this.sala).subscribe({
                next: (sala) => {
                  const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
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
              }); */

              this.fechaActual.setMinutes(this.fechaActual.getMinutes() + 10);
              cont++;
            } else {
              /* console.log(
                '----------------------------------------------------------------------------------',
              ); */
              this.sala++;
              const fechaActualUTC = new Date(
                this.fechaActual.getTime() +
                  this.fechaActual.getTimezoneOffset() * 60000,
              );
              fechaActualUTC.setHours(9, 0, 0, 0);

              fechaActualUTC.setDate(fechaActualUTC.getDate() - 1);

              this.fechaActual = new Date(
                fechaActualUTC.getTime() -
                  fechaActualUTC.getTimezoneOffset() * 60000,
              );
              const horaInicio = this.fechaActual.toUTCString().split(' ')[4];

              const fecha = this.fechaActual.toISOString().split('T')[0];
              this.fechaActual.setMinutes(
                this.fechaActual.getMinutes() + pelicula.duracion,
              );
              const horaFinal = this.fechaActual.toUTCString().split(' ')[4];

              /* const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
              console.log(
                'pelicula: ' +
                  pelicula.titulo +
                  ' horaFinal: ' +
                  horaFinal +
                  ' horainciio:; ' +
                  horaInicio +
                  ' sala: ' +
                  this.sala +
                  ' duracion: ' +
                  pelicula.duracion +
                  ' fecha: ' +
                  fecha +
                  ' precio: ' +
                  precio,
              ); */

              /* this.salaServicio.obtenerSala(this.sala).subscribe({
                next: (sala) => {
                  const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
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
              }); */

              this.fechaActual.setMinutes(this.fechaActual.getMinutes() + 10);
              cont++;
            }
          });

          cont = 0;
          const fechaActualUTC = new Date(
            this.fechaActual.getTime() +
              this.fechaActual.getTimezoneOffset() * 60000,
          );
          fechaActualUTC.setHours(9, 0, 0, 0);

          fechaActualUTC.setDate(fechaActualUTC.getDate());

          this.fechaActual = new Date(
            fechaActualUTC.getTime() -
              fechaActualUTC.getTimezoneOffset() * 60000,
          );
          this.sala++;
          /* console.log(
            'REVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSEREVERSE',
          ); */

          peliculas.reverse().forEach((pelicula) => {
            const horaActual = this.fechaActual.getUTCHours();
            const minutosActual = this.fechaActual.getUTCMinutes();
            const segundosActual = this.fechaActual.getUTCSeconds();
            if (
              horaActual > 8 ||
              (horaActual === 8 && minutosActual > 59) ||
              (horaActual === 8 && minutosActual === 59 && segundosActual > 59)
            ) {
              const horaInicio = this.fechaActual.toUTCString().split(' ')[4];
              const fecha = this.fechaActual.toISOString().split('T')[0];

              this.fechaActual.setMinutes(
                this.fechaActual.getMinutes() + pelicula.duracion,
              );
              const horaFinal = this.fechaActual.toUTCString().split(' ')[4];

              /* const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
              console.log(
                'pelicula: ' +
                  pelicula.titulo +
                  ' horaFinal: ' +
                  horaFinal +
                  ' horainciio:; ' +
                  horaInicio +
                  ' sala: ' +
                  this.sala +
                  ' duracion: ' +
                  pelicula.duracion +
                  ' fecha: ' +
                  fecha +
                  ' precio: ' +
                  precio,
              ); */

              /* this.salaServicio.obtenerSala(this.sala).subscribe({
                next: (sala) => {
                  const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
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
              }); */

              this.fechaActual.setMinutes(this.fechaActual.getMinutes() + 10);
              cont++;
            } else {
              /* console.log(
                '----------------------------------------------------------------------------------',
              ); */
              this.sala++;
              const fechaActualUTC = new Date(
                this.fechaActual.getTime() +
                  this.fechaActual.getTimezoneOffset() * 60000,
              );
              fechaActualUTC.setHours(9, 0, 0, 0);

              fechaActualUTC.setDate(fechaActualUTC.getDate() - 1);

              this.fechaActual = new Date(
                fechaActualUTC.getTime() -
                  fechaActualUTC.getTimezoneOffset() * 60000,
              );
              const horaInicio = this.fechaActual.toUTCString().split(' ')[4];

              const fecha = this.fechaActual.toISOString().split('T')[0];
              this.fechaActual.setMinutes(
                this.fechaActual.getMinutes() + pelicula.duracion + 10,
              );
              const horaFinal = this.fechaActual.toUTCString().split(' ')[4];

              /* const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
              console.log(
                'pelicula: ' +
                  pelicula.titulo +
                  ' horaFinal: ' +
                  horaFinal +
                  ' horainciio:; ' +
                  horaInicio +
                  ' sala: ' +
                  this.sala +
                  ' duracion: ' +
                  pelicula.duracion +
                  ' fecha: ' +
                  fecha +
                  ' precio: ' +
                  precio,
              ); */

              /* this.salaServicio.obtenerSala(this.sala).subscribe({
                next: (sala) => {
                  const precio = Math.floor(Math.random() * (12 - 6)) + 6.99;
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
              }); */

              this.fechaActual.setMinutes(this.fechaActual.getMinutes() + 10);
              cont++;
            }
          });

          const fechaSiguiente = new Date(
            fechaConstActual.getTime() +
              fechaConstActual.getTimezoneOffset() * 60000,
          );
          fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

          this.fechaActual = new Date(
            fechaSiguiente.getTime() -
              fechaSiguiente.getTimezoneOffset() * 60000,
          );

          peliculas.sort(() => Math.random() - 0.5);
        }
      },
    });
  }

  /* ngOnInit(): void {
    for (let index = 1; index <= 5; index++) {
      this.apiService.obtenerPeliculasApi(index).subscribe({
        next: (peliculas) => {
          peliculas.forEach((pelicula: Pelicula) => {
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
                          console.log('error');
                        },
                      });
                    }
                  },
                });
              },
            });
          });
        },
      });
    }
  } */
}
