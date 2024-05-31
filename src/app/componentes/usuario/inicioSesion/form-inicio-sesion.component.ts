import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/');
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
            sessionStorage.setItem('token', usuario.contraseña);
            sessionStorage.setItem('Username', usuario.nombreUsuario);
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
