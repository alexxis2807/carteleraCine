import { Routes } from '@angular/router';
import { FormUsuarioComponent } from './componentes/usuario/formularioUsuario/form-usuario.component';
import { FormInicioSesionComponent } from './componentes/usuario/inicioSesion/form-inicio-sesion.component';
import { RegistraUsuarioComponent } from './componentes/usuario/registro/registra-usuario.component';
import { PeliculasPopularComponent } from './componentes/peliculas/populares/peliculas-popular.component';
import { PeliculaDetallesComponent } from './componentes/peliculas/detalles/pelicula-detalles.component';
import { PeliculaApiComponent } from './componentes/apiPeliculas/pelicula-api.component';
import { TodasPeliculasComponent } from './componentes/peliculas/todasPeliculas/todas-peliculas.component';

export const routes: Routes = [
  { path: 'FormularioUsuario', component: FormUsuarioComponent },
  { path: 'registro', component: RegistraUsuarioComponent },
  { path: 'inicioSesion', component: FormInicioSesionComponent },
  { path: 'peliculas/populares', component: PeliculasPopularComponent },
  //{ path: 'peliculas/api', component: PeliculaApiComponent },
  { path: 'peliculas', component: TodasPeliculasComponent },
  {
    path: 'peliculas/detalles/:idPelicula',
    component: PeliculaDetallesComponent,
  },
];
