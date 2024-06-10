import { Component, OnInit } from '@angular/core';
import { EntradaService } from '../../../servicios/entrada.service';
import { Entrada } from '../../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-entradas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mis-entradas.component.html',
  styleUrl: './mis-entradas.component.scss',
})
export class MisEntradasComponent implements OnInit {
  nombreUsuario = localStorage.getItem('Username') || '';
  entradasUsuario: Entrada[] = [];

  constructor(private entradaServicio: EntradaService) {}

  ngOnInit(): void {
    this.entradaServicio.obtenerEntradasUsuario(this.nombreUsuario).subscribe({
      next: (entradas) => {
        this.entradasUsuario = entradas;
        console.log(this.entradasUsuario);
      },
    });
  }

  eliminarEntrada(idEntrada: number) {
    this.entradaServicio.eliminarEntrada(idEntrada).subscribe(() => {
      this.entradasUsuario = this.entradasUsuario.filter(
        (entrada) => entrada.id !== idEntrada,
      );
    });
  }
}
