import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entrada } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { EntradaService } from '../../servicios/entrada.service';

@Component({
  selector: 'app-compra-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra-entrada.component.html',
  styleUrl: './compra-entrada.component.scss',
})
export class CompraEntradaComponent implements OnInit {
  tiempoSesion: number = 30;
  interval: any;

  entradas!: Entrada[];
  totalCompra = 0;
  mensajeExitoCompra = '';

  constructor(
    private entradaServicio: EntradaService,
    private router: Router,
  ) {}

  ngOnInit() {
    const tiempoSesion = localStorage.getItem('tiempoSesion');

    if (tiempoSesion) {
      const segundosSesion = Math.floor(
        (Date.now() - Number(tiempoSesion)) / 1000,
      );
      this.tiempoSesion -= segundosSesion;

      if (this.tiempoSesion <= 0) {
        this.sesionExpirada();
        return;
      }
    } else {
      localStorage.setItem('tiempoSesion', Date.now().toString());
    }

    this.comenzarTiempoSesion();

    const data = localStorage.getItem('entradasEnProceso');
    if (data == null) {
      this.router.navigateByUrl('/peliculas');
    }
    this.entradas = data ? JSON.parse(data) : null;
    this.entradas.forEach((entrada) => {
      this.totalCompra = this.totalCompra + entrada.precio;
    });
  }

  cancelarEntradas() {
    this.entradas.forEach((entrada) => {
      this.entradaServicio.eliminarEntrada(entrada.id).subscribe();
    });
    localStorage.removeItem('entradasEnProceso');
    window.location.href =
      '/reservaSesion/' + this.entradas[0].sesionPelicula.id;
  }

  realizarCompra() {
    localStorage.removeItem('entradasEnProceso');
    localStorage.removeItem('tiempoSesion');

    this.mensajeExitoCompra = 'Tu compra se ha realizado correctamente!';
    setTimeout(() => {
      window.location.href = '/peliculas';
    }, 2000);
  }

  comenzarTiempoSesion() {
    this.interval = setInterval(() => {
      this.tiempoSesion--;

      if (this.tiempoSesion <= 0) {
        this.sesionExpirada();
      }
    }, 1000);
  }

  sesionExpirada() {
    clearInterval(this.interval);
    localStorage.removeItem('tiempoSesion');
    this.cancelarEntradas();
    alert('Sesión finalizada. Vas a ser redirigido');
  }
  get minutes(): number {
    return Math.floor(this.tiempoSesion / 60);
  }

  get seconds(): number {
    return this.tiempoSesion % 60;
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
