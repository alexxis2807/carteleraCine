import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
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
    console.log('-----------------');
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }
}
