import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    localStorage.clear();
  }
  title = 'CarteleraCine';

  @HostListener('window:storage', ['$event'])
  onEventoStorage(event: StorageEvent) {
    if (event.key === 'sessionCerrada') {
      localStorage.removeItem('token');
      localStorage.removeItem('Username');
      window.location.href = '/inicioSesion';
    } else {
      if (localStorage.getItem('token') && localStorage.getItem('Username')) {
        window.location.href = '/peliculas';
      }
    }
  }
}
