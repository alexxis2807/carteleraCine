import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'app-form-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.scss',
})
export class FormInicioSesionComponent implements OnInit {
  formInicio!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('Username')) {
      window.location.href = '/peliculas';
    }

    this.formInicio = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  inicioSesion() {
    const form = this.formInicio.getRawValue();
    if (this.formInicio.valid) {
      this.usuarioService
        .inicioSesion(form.nombreUsuario, form.contraseña)
        .subscribe({
          next: (usuario) => {
            localStorage.setItem('token', usuario.contraseña);
            localStorage.setItem('Username', usuario.nombreUsuario);

            window.location.href = '/peliculas';
          },
          error: (err) => {
            if (err.status == 404) {
              this.error = 'El nombre de usuario y contraseña no son válidos';
            }
          },
        });
    } else if (form.nombreUsuario == '') {
      this.error = 'El nombre de usuario es obligatorio';
    } else if (form.contraseña == '') {
      this.error = 'La contraseña es obligatoria';
    }
  }
}
