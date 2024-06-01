import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../assets/environments';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = environment.urlApiUsuarios;

  constructor(private http: HttpClient) {}

  public obtenerUsuarioPorId(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + '/busca/' + idUsuario);
  }

  public registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/registrar', usuario);
  }

  public inicioSesion(
    nombreUsuario: string,
    contrasena: string,
  ): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/inicioSesion', {
      nombreUsuario,
      contrasena,
    });
  }
}
