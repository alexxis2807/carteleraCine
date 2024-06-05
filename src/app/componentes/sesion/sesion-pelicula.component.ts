import { Component, OnInit } from '@angular/core';
import { SesionPelicula } from '../../interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SesionPeliculaService } from '../../servicios/sesion-pelicula.service';
import { CommonModule } from '@angular/common';
import { EntradaService } from '../../servicios/entrada.service';
import { environment } from '../../../assets/environments';

@Component({
  selector: 'app-sesion-pelicula',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sesion-pelicula.component.html',
  styleUrl: './sesion-pelicula.component.scss',
})
export class SesionPeliculaComponent implements OnInit {
  sesionPelicula!: SesionPelicula;
  idSesion!: number;
  asientosOcupados!: number[];
  asientosElegidos: number[] = [];
  error = '';
  usuarioReserva = environment.adminReservas;

  constructor(
    private route: ActivatedRoute,
    private sesionPeliculaServicio: SesionPeliculaService,
    private entradaServicio: EntradaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.idSesion = Number(this.route.snapshot.paramMap.get('idSesion'));
    this.sesionPeliculaServicio.obtenerSesionPelicula(this.idSesion).subscribe({
      next: (sesion) => {
        this.sesionPelicula = sesion;
      },
    });
    this.sesionPeliculaServicio
      .obtenerAsientosOcupados(this.idSesion)
      .subscribe({
        next: (asientosOcupados) => {
          this.asientosOcupados = asientosOcupados;
        },
      });
  }

  seleccionarAsiento(asiento: number) {
    if (!this.asientosOcupados.includes(asiento)) {
      const index = this.asientosElegidos.indexOf(asiento);

      if (index > -1) {
        this.asientosElegidos.splice(index, 1);
      } else {
        this.asientosElegidos.push(asiento);
      }
      if (this.asientosElegidos.length > 5) {
        this.asientosElegidos.splice(0, 1);
      }
    }
  }

  estaSeleccionado(asiento: number): boolean {
    return this.asientosElegidos.includes(asiento);
  }

  asientoOcupado(asiento: number): boolean {
    return this.asientosOcupados.includes(asiento);
  }

  reservaEntradas() {
    const asientos = this.asientosElegidos;
    if (asientos.length > 0) {
      const idSesion = this.sesionPelicula.id;
      const nombreUsuario = localStorage.getItem('Username');
      if (nombreUsuario == null) {
        this.error = 'El nombre de usuario no existe';
        return;
      }
      const precio = this.sesionPelicula.precio;
      this.entradaServicio
        .guardarEntradas(idSesion, asientos, this.usuarioReserva, precio)
        .subscribe({
          next: (entradas) => {
            localStorage.setItem('entradasEnProceso', JSON.stringify(entradas));
          },
          error: () => {
            this.error = 'No se ha podido completar la reserva de asientos';
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          complete: () => {
            this.router.navigateByUrl('compraEntrada');
          },
        });
    }
  }
}
