import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  haySesion = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.haySesion = true;
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Username');
    window.location.href = '/inicioSesion';
  }
}
