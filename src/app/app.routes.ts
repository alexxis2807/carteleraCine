import { Routes } from '@angular/router';
import { FormUsuarioComponent } from './componentes/usuario/formularioUsuario/form-usuario.component';
import { FormInicioSesionComponent } from './componentes/usuario/inicioSesion/form-inicio-sesion.component';
import { RegistraUsuarioComponent } from './componentes/usuario/registro/registra-usuario.component';
import { PeliculasPopularComponent } from './componentes/peliculas/populares/peliculas-popular.component';
import { PeliculaDetallesComponent } from './componentes/peliculas/detalles/pelicula-detalles.component';

export const routes: Routes = [
  { path: 'FormularioUsuario', component: FormUsuarioComponent },
  { path: 'registro', component: RegistraUsuarioComponent },
  { path: 'inicioSesion', component: FormInicioSesionComponent },
  { path: 'peliculas/populares', component: PeliculasPopularComponent },
  {
    path: 'peliculas/detalles/:idPelicula',
    component: PeliculaDetallesComponent,
  },
];
