import { Component, OnInit } from '@angular/core';
import { EntradaService } from '../../../servicios/entrada.service';
import { Entrada } from '../../../interfaces';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private entradaServicio: EntradaService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Mis Entradas');

    this.entradaServicio.obtenerEntradasUsuario(this.nombreUsuario).subscribe({
      next: (entradas) => {
        this.entradasUsuario = entradas;
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
