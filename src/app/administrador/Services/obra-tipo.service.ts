import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialTipo } from 'src/app/Models/material-tipo';
import { environment } from 'src/environments/environment';
import { ObraTipo } from '../../Models/obra-tipo';

@Injectable({
  providedIn: 'root'
})
export class ObraTipoService {

  private baseUrl: string = environment.baseUrl+"/api";
  
  constructor(private http: HttpClient) { }

  
  agregar(mt: ObraTipo):Observable<ObraTipo> {
    return this.http.post<ObraTipo>(`${this.baseUrl}/obras-tipo`, mt);
  }

  listar(): Observable<ObraTipo[]> {
    return this.http.get<ObraTipo[]>(`${this.baseUrl}/obras-tipos/`);
  }

  actualizar(mt: ObraTipo): Observable<ObraTipo> {
    return this.http.put<MaterialTipo>(`${this.baseUrl}/obras-tipo`, mt);
  }

  getObraTipoPorId(id: number): Observable<ObraTipo> {
    return this.http.get<ObraTipo>(`${this.baseUrl}/obras-tipo/${id}`);
  }
  
}
