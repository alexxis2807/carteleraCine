import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  haySesion = false;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem("Username")) {
      this.haySesion = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    localStorage.setItem('sessionCerrada', 'true');
    localStorage.removeItem('sessionCerrada');
    window.location.href = '/inicioSesion';
  }
}
