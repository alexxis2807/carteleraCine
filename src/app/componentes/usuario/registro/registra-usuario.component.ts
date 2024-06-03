import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUsuarioComponent } from '../formularioUsuario/form-usuario.component';
import { UsuarioService } from '../../../servicios/usuario.service';

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
  exito = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('Username')) {
      window.location.href = '/peliculas';
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
            localStorage.setItem('token', usuario.contraseña);
            localStorage.setItem('Username', usuario.nombreUsuario);
            this.error = '';
            this.exito = 'Te has registrado correctamente!';
            window.setTimeout(() => {
              window.location.href = '/peliculas';
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
}
