import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraTipo } from 'src/app/Models/obra-tipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {


  private baseUrl: string = environment.baseUrl + "/api";

  constructor(private http: HttpClient) { }


  listar(): Observable<ObraTipo[]> {
    return this.http.get<ObraTipo[]>(`${this.baseUrl}/obras-tipos/`);
  }
}
