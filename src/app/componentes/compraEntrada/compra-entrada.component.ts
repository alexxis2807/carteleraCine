import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entrada } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra-entrada.component.html',
  styleUrl: './compra-entrada.component.scss',
})
export class CompraEntradaComponent implements OnInit {
  entradas!: Entrada[];

  constructor() {}

  ngOnInit() {
    const data = sessionStorage.getItem('entradasEnProceso');
    this.entradas = data ? JSON.parse(data) : null;
  }
}
