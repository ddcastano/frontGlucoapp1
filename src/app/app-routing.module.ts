import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUsuarioComponent } from './component/register-usuario/register-usuario.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { RegistroGlucometriaComponent } from './component/registro-glucometria/registro-glucometria.component';
import { HistorialComponent } from './component/historial/historial.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige la ruta vacía a 'login'
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterUsuarioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio/registro', component: RegistroGlucometriaComponent },
  { path: 'inicio/historial', component: HistorialComponent }
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
