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
  entradas!: Entrada[];
  totalCompra = 0;
  mensajeExitoCompra = '';

  constructor(
    private entradaServicio: EntradaService,
    private router: Router,
  ) {}

  ngOnInit() {
    const data = sessionStorage.getItem('entradasEnProceso');
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
    sessionStorage.removeItem('entradasEnProceso');
    window.location.href =
      '/reservaSesion/' + this.entradas[0].sesionPelicula.id;
  }

  realizarCompra() {
    sessionStorage.removeItem('entradasEnProceso');

    this.mensajeExitoCompra = 'Tu compra se ha realizado correctamente!';
    setTimeout(() => {
      window.location.href = '/peliculas';
    }, 2000);
  }
}
