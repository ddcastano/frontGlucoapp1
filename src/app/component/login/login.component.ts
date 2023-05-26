import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/gluco';
import { LocalService } from 'src/app/service/local.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage!: string;
  usuario: Usuario = new Usuario();
  hide = true;

  ngOnInit(): void {
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private localService: LocalService
  ) {
    this.loginForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.usuario.cedula = this.loginForm.value.cedula;
    this.usuario.contrasena = this.loginForm.value.contrasena;

    this.loginService.login(this.usuario).subscribe(
      data => {
        // Guardar la información del usuario en localStorage
        this.localService.localSaveUser('user', JSON.stringify(data));
        // Redirigir al usuario a la página deseada
        this.router.navigate(['/inicio']);
      },
      error => {
        console.log(error);
        this.errorMessage = 'Credenciales inválidas';
      }
    );
  }



  localSesionData() {
    return this.localService.localGetUser('user');
  }
}

