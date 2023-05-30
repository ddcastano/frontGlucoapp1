import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUsuarioComponent } from './component/register-usuario/register-usuario.component';
import { HistorialComponent } from './component/historial/historial.component';
import { RegistroGlucometriaComponent } from './component/registro-glucometria/registro-glucometria.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JsonPipe, NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    RegisterUsuarioComponent,
    HistorialComponent,
    RegistroGlucometriaComponent,
    InicioComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatDialogModule,   
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgIf,
    JsonPipe,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    
  ],
  providers: [Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
