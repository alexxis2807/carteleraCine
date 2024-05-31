import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUsuarioComponent } from '../formularioUsuario/form-usuario.component';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registra-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormUsuarioComponent],
  templateUrl: './registra-usuario.component.html',
  styleUrl: './registra-usuario.component.scss',
})
export class RegistraUsuarioComponent implements OnInit {
  formUsuario!: FormGroup;
  textoSubmit = 'Registrar';
  registrar!: Function;
  error = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/');
    }

    this.formUsuario = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      repContraseña: ['', Validators.required],
      correo: ['', [Validators.required, , Validators.email]],
    });

    this.registrar = this.accionRegistrar;
  }

  accionRegistrar = (): void => {
    if (this.formUsuario.valid) {
      const usuario = this.formUsuario.getRawValue();
      if (usuario.contraseña != usuario.repContraseña) {
        this.error = 'Las contraseñas no coinciden';
      } else {
        this.usuarioService.registrarUsuario(usuario).subscribe({
          next: (usuario) => {
            sessionStorage.setItem('token', usuario.contraseña);
            sessionStorage.setItem('Username', usuario.nombreUsuario);

            this.error = 'Te has registrado correctamente!';
            window.setTimeout(() => {
              window.location.href = "/peliculas"
            }, 2000);
          },
          error: (err) => {
            this.error = err.error;
          },
        });
      }
    } else {
      this.error = 'Todos los campos son obligatorios';
    }
  };

  volver(): void {
    window.location.href = '/';
  }
}
