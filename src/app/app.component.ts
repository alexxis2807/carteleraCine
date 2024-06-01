import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'CarteleraCine';

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'sessionCerrada') {
        localStorage.removeItem('token');
        localStorage.removeItem('Username');
        window.location.href = '/inicioSesion';
      } else {
        if (localStorage.getItem('token') && localStorage.getItem('Username')) {
          window.location.href = '/peliculas';
        }
      }
    });
  }
}
