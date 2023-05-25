import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registros } from 'src/app/models/gluco';
import { GlucoService } from 'src/app/service/gluco.service';

@Component({
  selector: 'app-registro-glucometria',
  templateUrl: './registro-glucometria.component.html',
  styleUrls: ['./registro-glucometria.component.css']
})
export class RegistroGlucometriaComponent {

  public user: any;

  registro!: Registros;

  constructor(private glucoService: GlucoService, private activateRoute: ActivatedRoute, private router:Router,private formBuilder: FormBuilder) { 

    this.user = JSON.parse(sessionStorage.getItem('user') ?? '');

    this.registro = new Registros();

  }


  ngOnInit() {
    
  }

  formGlucometria = this.formBuilder.group({

    'glucometria': [, Validators.required],
    

  });


  registrarUsuario() {
    if (this.formGlucometria.valid ) {
      this.registro.cedula = this.user.cedula;
      this.registro.glucometria = this.formGlucometria.controls['glucometria']?.value ?? 0;
  
      this.glucoService.guardarRegistro(this.registro).subscribe(response => {
        // Convertir el objeto de respuesta a una cadena JSON
        this.router.navigate(['/inicio']);
      });
    } else {
      console.log("No válido");
    }
  }
  
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  volver(): void {
    this.router.navigate(['/inicio']);
  }

}
