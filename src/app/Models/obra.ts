import { Autor } from "./autor";
import { ObraTipo } from "./obra-tipo";

export class Obra {


  id: number;

  codigo: string;

  titulo: string;

  subtitulo: string;

  resumen: string;

  cantidad: number;


  archivoImagen: File;

  nombreArchivoImagen: string;

  fecha_publicacion: string;

  fecha_registro: Date;


  obra_tipo: ObraTipo;


 
  archivoDocumento: File;

  nombreArchivoDocumento: string;
	

  autores: Autor[];




}
