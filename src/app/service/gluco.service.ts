import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro24h, RegistroFecha, Registros, Usuario } from '../models/gluco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlucoService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  
  
  // CREACION DE GLUCOMETRIAS
  guardarRegistro(registro: Registros): Observable<Registros> {
    return this.http.post<Registros>(`${this.apiUrl}/guardarRegistro`, registro);
  }

  // LISTA GLUCOMETRIAS LAS ULTIMAS 24 H
  lista24h(cedula: string): Observable<Registro24h[]> {
    return this.http.get<Registro24h[]>(`${this.apiUrl}/lista24h/${cedula}`);
  }

  // LISTA LAS GLUCOMETRIAS DESDE UNA FECHA A OTRA
  listaFecha(fechaInicio: string, fechaFin: string, cedula: string): Observable<RegistroFecha[]> {
    return this.http.get<RegistroFecha[]>(`${this.apiUrl}/listarFecha/${fechaInicio}/${fechaFin}/${cedula}`);
  }


}
