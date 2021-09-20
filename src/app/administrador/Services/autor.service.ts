import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/Models/autor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private baseUrl: string = environment.baseUrl+"/api";
  
  constructor(private http: HttpClient) { }

  
  agregar(autor: Autor):Observable<Autor> {
    return this.http.post<Autor>(`${this.baseUrl}/autores`, autor);
  }

   agregarList(autores: Autor[]):Observable<Autor[]> {
    return this.http.post<Autor[]>(`${this.baseUrl}/autores/all`, autores);
  }

 

  listar(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.baseUrl}/autores/`);
  }

  actualizar(a: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrl}/autores`, a);
  }

  getAutorPorId(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/autores/${id}`);
  }

    
  filtrarAutores( termino:string): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.baseUrl}/autores/busqueda/${termino}`);
  }

  
  
}
