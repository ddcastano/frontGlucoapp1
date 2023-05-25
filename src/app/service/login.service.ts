import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/gluco';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, usuario);
  }

  // CREACION DE USUARIO
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/guardarUsuario`, usuario);
  }

}