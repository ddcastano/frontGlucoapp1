import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/gluco';
import { LocalService } from 'src/app/service/local.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styleUrls: ['./register-usuario.component.css']
})
export class RegisterUsuarioComponent implements OnInit {


  usuario!: Usuario;

  constructor(private localService: LocalService,private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

    this.usuario = new Usuario();

  }

  ngOnInit(): void {
  }

  formRegister = this.formBuilder.group({

    'cedula': ['', Validators.required],
    'nombre': ['', Validators.required],
    'contrasena': ['', Validators.required],
    'confirmContrasena': ['', [Validators.required, this.confirmarContrasenaValidator]],
    'celular': ['', Validators.required]

  });

  
  volver(): void {
    this.router.navigate(['/login']);
  }

  confirmarContrasenaValidator(control: AbstractControl) {
    const contrasena = control.root.get('contrasena')?.value;
    const confirmContrasena = control.value;
    if (contrasena !== confirmContrasena) {
      return { noCoincide: true };
    }
    return null;
  }

  registrarUsuario() {
    if (this.formRegister.valid && this.formRegister.controls['confirmContrasena'].value === this.formRegister.controls['contrasena'].value) {
      this.usuario.cedula = this.formRegister.controls['cedula']?.value ?? '';
      this.usuario.nombre = this.formRegister.controls['nombre']?.value ?? '';
      this.usuario.contrasena = this.formRegister.controls['contrasena']?.value ?? '';
      this.usuario.celular = this.formRegister.controls['celular']?.value ?? '';
  
      this.loginService.guardarUsuario(this.usuario).subscribe(response => {
        // Convertir el objeto de respuesta a una cadena JSON
        const usuarioJSON = JSON.stringify(response);
        // Guardar la información del usuario en localStorage
        this.localService.localSaveUser('user', usuarioJSON);
        // Redirigir al usuario a la página deseada (inicio)
        this.router.navigate(['/login']);
      });
    } else {
      console.log("No válido");
    }
  }
}