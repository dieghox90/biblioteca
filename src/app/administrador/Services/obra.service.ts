import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Obra } from 'src/app/Models/obra';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  private baseUrl: string = environment.baseUrl + "/api";
  
  constructor(private http: HttpClient) { }

  
  agregar(mt: Obra): Observable<Obra> {
    return this.http.post<Obra>(`${this.baseUrl}/obras`, mt);
  }

  listar(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.baseUrl}/obras`);
  }

  actualizar(mt: Obra): Observable<Obra> {
    return this.http.put<Obra>(`${this.baseUrl}/obras`, mt);
  }

  getObraPorId(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.baseUrl}/obras/${id}`);
  }

  
  filtrarObras(termino: string): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.baseUrl}/obras/busqueda/${termino}`);
  }



  subirImagenes(obra: Obra) {
    let formData = new FormData();
    formData.append("id_obra", obra.id + "");
    formData.append("imagen", obra.archivoImagen);
    formData.append("documento", obra.archivoDocumento);
    return this.http.put<Obra>(`${this.baseUrl}/obras/subir-imagen`, formData);
    
  }


  public buscador(titulo: string, tipo: string): Observable<Obra[]> {
    let params = new HttpParams()
      .set('titulo', titulo + "")
      .set('tipo', tipo + "")
    return this.http.get<Obra[]>(this.baseUrl + "/obras/buscador", { params: params });


 

  }

}