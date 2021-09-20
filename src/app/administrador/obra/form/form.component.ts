import { ObraTipoService } from './../../Services/obra-tipo.service';
import { ObraTipo } from 'src/app/Models/obra-tipo';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Obra } from 'src/app/Models/obra';
import Swal from 'sweetalert2';
import { ObraService } from '../../Services/obra.service';
import { AutorService } from '../../Services/autor.service';
import { Autor } from 'src/app/Models/autor';
import { FileItem } from 'src/app/Models/file-item';
import { environment } from 'src/environments/environment';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  obra: Obra;
  obras: Obra[];

  tipos: ObraTipo[];

  isEdit: number;
  autoresFiltrados: Autor[] = [];
  autoresSeleccionados: Autor[] = [];
  autor: Autor;

  archivo: FileItem | any;

  archivoDocumento: FileItem | any;

  imgPreview: string | ArrayBuffer;

  archivoImagenGuardado = "";

  archivoDocumentoGuardado = "";

  urlBaseImg = environment.baseUrlImg;


  documento: boolean = false;

  imagen: boolean = false;


  public datePipe: DatePipe;

  fecha: Date = new Date();


  @ViewChild('inputFileImg')
  inputFile: ElementRef;

  @ViewChild('inputFileDocumento')
  inputFileDocumento: ElementRef;



  miFormulario: FormGroup = this.fb.group({
    id: [''],
    codigo: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    subtitulo: [''],
    nombreArchivoDocumento: [''],
    nombreArchivoImagen: [''],
    resumen: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    obra_tipo: ['', [Validators.required]],
    fecha_publicacion: [''],
    fecha: [new Date(),[Validators.required]],
    fecha_registro: [''],
    archivo: [''],
    nombreArchivo: [''],
  });


  constructor(private service: ObraService,
    private serviceTipo: ObraTipoService,
    private serviceAutor: AutorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.obra = new Obra();
    this.obras = [];
    this.isEdit = 0;
    this.autor = new Autor();
    this.datePipe = new DatePipe('es');
    this.obras = [];

  }

  ngOnInit(): void {

    this.spinner.show();
    this.serviceTipo.listar().subscribe(res => {
      this.tipos = res;
    });



    if (!this.router.url.includes('editar')) {
      this.spinner.hide();
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getObraPorId(id))
      )
      .subscribe(o => {
        this.isEdit = o.id;
        this.miFormulario.patchValue(o);
        this.obra = o;

        this.autoresSeleccionados = o.autores;
        this.archivoImagenGuardado = o.nombreArchivoImagen;
        this.archivoDocumentoGuardado = o.nombreArchivoDocumento;
        this.documento = true;
        this.imagen = true;

        this.miFormulario.controls["obra_tipo"].patchValue(this.tipos.find(el => el.id === o?.obra_tipo.id));

        this.miFormulario.controls["fecha"].patchValue(new Date(this.obra.fecha_publicacion));
        this.spinner.hide();
      });
  }




  guardarOactualizar() {

    this.spinner.show();

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      this.toastr.error('Complete los campos correctamente', 'Error - Validación');
      this.spinner.hide();
      return;
    }
    const formValue = { ...this.miFormulario.value };



    this.obra = formValue;

    // console.log(this.miFormulario.controls['fecha'].value);
    this.obra.fecha_publicacion = this.datePipe.transform(this.miFormulario.controls['fecha'].value, "yyyy-MM-dd")!.toString();
  

    //console.log(this.obra.fecha_publicacion);
  
    //this.obra.fecha_publicacion=new Date(this.miFormulario.controls['fecha_publicacion'].value);

    console.log(this.obra);


    // ----- Para actualizar o guardar -----
    if (this.isEdit) {
      //----- -ACTUALIZAMOS-------




      // ----- Autores ------
      if (this.autoresSeleccionados.length > 0) {

        let autoresGuardar: Autor[] = [];

        this.autoresSeleccionados = this.autoresSeleccionados.filter(a => a.activado != false);

        this.obra.autores = this.autoresSeleccionados;
      }

      if (this.obra.autores.length == 0) {
        this.toastr.error('Error: Debe seleccionar al menos un Autor', 'Autor Obligatorio');
        return;
      }

      this.obra.id = this.isEdit;
      this.obra.nombreArchivoDocumento = this.archivoDocumentoGuardado;
      this.obra.nombreArchivoImagen = this.archivoImagenGuardado;



      this.service.actualizar(this.obra).subscribe(o => {

        if (this.archivo != null || this.archivoDocumento != null) {
          o.archivoImagen = this.archivo?.archivo;
          o.archivoDocumento = this.archivoDocumento?.archivo;


          this.service.subirImagenes(o).subscribe(a => {
            this.archivo = null;
            this.inputFile.nativeElement.value = null;
          });
        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizacion',
          html: "Obra <strong>" + this.obra.titulo + "</strong> Actualizada con éxito",
          showConfirmButton: true,
          timer: 1200
        });

        this.miFormulario.reset();
        this.obra = new Obra();
        this.isEdit = 0;
        this.documento = false;
        this.router.navigate(['/admin/lista-obras']);
        this.spinner.hide();
      });

    } else {
      //----- GUARDAMOS -------
      if (this.archivoDocumento == null) {
        this.toastr.error('Error: Debe adjuntar el documento PDF', 'Archivo Obligatorio');
        this.spinner.hide();
        return;
      }

      // ----- Autores ------
      if (this.autoresSeleccionados.length > 0) {

        let autoresGuardar: Autor[] = [];

        this.autoresSeleccionados = this.autoresSeleccionados.filter(a => a.activado != false);

        this.obra.autores = this.autoresSeleccionados;
      } else {
        this.toastr.error('Error: Debe seleccionar al menos un Autor', 'Autor Obligatorio');
        this.spinner.hide();
        return;
      }

      this.service.agregar(this.obra).subscribe(resulObra => {
        if (this.archivo != null && this.archivoDocumento != null) {

          resulObra.archivoImagen = this.archivo.archivo;
          resulObra.archivoDocumento = this.archivoDocumento.archivo;
          console.log(resulObra);
          this.service.subirImagenes(resulObra).subscribe(a => {
            this.archivo = null;
            this.archivoDocumento = null;
            this.inputFile.nativeElement.value = null;
            this.spinner.hide();
          });

        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          html: "Obra <strong>" + resulObra.titulo + "</strong> Registrada con éxito",
          showConfirmButton: true,
          timer: 1200
        }
        );
        //this.obras.push(tip);
        this.miFormulario.reset();
        this.obra = new Obra();
        this.autor = new Autor();
        this.autoresSeleccionados = [];
        this.archivoDocumento!.nombreArchivo = "";
        this.documento = false;


        this.archivo = null;
         this.spinner.hide();

      });

    }



  }


  filtrarAutores(event: any) {
    if (event.target.value != '') {
      this.serviceAutor.filtrarAutores(event.target.value).subscribe(a => {

        if (a.length > 0) {
          this.autoresFiltrados = a;
        } else {
          this.autoresFiltrados = [];
          const aut: Autor = new Autor();
          aut.nombres = "No se encontraron registros";
          this.autoresFiltrados.push(aut);
        }

      });
    } else {
      this.autoresFiltrados = [];
    }


  }

  fijarAutoresBusqueda(a: Autor) {

    this.autoresFiltrados = [];
    this.autor = new Autor();
    a.activado = true;
    this.autor = a;

    this.autoresSeleccionados.push(a);

    //this.inputElementSearch.nativeElement.value = "";
    this.autoresFiltrados = [];
  }



  async seleccionarArchivo(event) {

   
    if (event.target.files[0]. type.toLowerCase().indexOf('jpg') > 0 ||
      event.target.files[0]. type.toLowerCase().indexOf('png') > 0 ||
      event.target.files[0]. type.toLowerCase().indexOf('jpeg') > 0
    ) {
      
      if (event.target.files.length > 0) {

        this.archivo = new FileItem(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = e => this.archivo.imgPreview = reader.result as string;
        reader.readAsDataURL(this.archivo.archivo);
        this.imagen = true;
  
        if (this.archivoImagenGuardado != '') {
  
          await Swal.fire({
            title: "REEMPLAZO",
            html: `¿Desea reemplazar la imagen: <br>
          <img style="width: 150px;" src="${this.urlBaseImg + this.obra.nombreArchivoImagen}" class="img-fluid">`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI"
          }).then(result => {
            if (result.value) {
              this.toastr.info('Imagen fijada, pulse actualizar para completar le proceso', 'Información')
  
              this.archivoImagenGuardado = '';
            } else {
              this.archivo = null;
            }
          });
  
        }
  
  
      }

    } else {
      Swal.fire('Error Tipo Archivo: ', 'Solo se aceptan imágenes en extension .jpg o .png', 'error');
    }


  }


  seleccionarArchivoDocumento(event) {

    if (event.target.files.length > 0) {

      let fileSize = event.target.files[0].size / 1024;

      console.log(fileSize);

      if (fileSize < 10000) {

        if (event.target.files[0].type.toLowerCase().indexOf('pdf') > 0) {


          this.archivoDocumento = new FileItem(event.target.files[0]);
          this.documento = true;

          if (this.archivoDocumentoGuardado != '') {
            Swal.fire({
              title: "REEMPLAZO",
              html: `¿Desea reemplazar El documento: <br>
          <img style="width: 100px;" src="${'assets/img/PDF.jpg'}" class="img-fluid">
          <strong><p>${this.archivoDocumentoGuardado}</p></strong> 
          <strong><p>Por:</p></strong>
          <img style="width: 100px;" src="${'assets/img/PDF.jpg'}" class="img-fluid">
          <strong><p>${this.archivoDocumento!.nombreArchivo}</p></strong>`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "SI"
            }).then(result => {
              if (result.value) {
                this.toastr.info('Documento fijado, pulse actualizar para completar le proceso', 'Información')
                this.archivoDocumentoGuardado = '';
              }
            });
          }


        } else {


          Swal.fire('Error Tipo Archivo: ', 'Solo se aceptan documentos de extension .pdf', 'error');
          this.archivoDocumento = null;
          this.documento = false;

     
        }

      } else {
        Swal.fire('Error tamaño archivo: ', 'El tamaño máximo permitido es de 5 MB', 'error');
        this.archivoDocumento = null;
        this.documento = false;
      }

    }
  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }


  eliminarAutor(autor: Autor) {
    this.autoresSeleccionados.forEach(a => {
      if (a.id === autor.id) {
        a.activado = false;
        this.toastr.warning('Autor listo para ser eliminado de la obra', 'Información')
      }

    });
  }

  activarAutor(autor: Autor) {
    this.autoresSeleccionados.forEach(a => {
      if (a.id === autor.id) {
        a.activado = true;
        this.toastr.success('Autor activado de nuevo en la obra', 'Información')
      }
    });
  }

}
