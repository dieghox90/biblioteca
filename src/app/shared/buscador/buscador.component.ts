import { ObraService } from './../../administrador/Services/obra.service';
import { ObraTipoService } from './../../administrador/Services/obra-tipo.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObraTipo } from 'src/app/Models/obra-tipo';
import { Obra } from 'src/app/Models/obra';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Autor } from 'src/app/Models/autor';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent implements OnInit {

  tipos: ObraTipo[] = [];
  tipo: ObraTipo;

  obras: Obra[] = [];

  obra: Obra;

  datePipe: DatePipe = new DatePipe('es');


  urlBaseImg = environment.baseUrlImg;

  urlPdf: string = "";

  miFormulario: FormGroup = this.fb.group({
    nombre: [''],
    tipos: [''],
    anio: [''],
  });


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private serviceTipo: ObraTipoService,
    private serviceObra: ObraService,
    private spinner: NgxSpinnerService

  ) {
    this.tipo = new ObraTipo();
    this.obra = new Obra();
    this.obra.autores = [];
  }


  ngOnInit(): void {

    this.spinner.show();

    this.serviceTipo.listar().subscribe(tps => {
      this.tipos = tps;
      this.spinner.hide();
    });
  }



  buscar() {
    this.spinner.show();
    this.obras = [];
    console.log("asdasd");
    console.log(this.miFormulario.controls);
    if (this.miFormulario.controls['nombre'].value == '' && this.miFormulario.controls['tipos'].value == '') {
      this.toastr.error('Debe llenar al menos un campo "Titulo o Tipo"', 'Error');
      this.spinner.hide();
      return;
    }

    this.serviceObra.buscador(
      this.miFormulario.controls['nombre'].value,
      this.miFormulario.controls['tipos'].value['nombre']
    ).subscribe(res => {
      this.obras = res;
      this.spinner.hide();
    });

  }


  ver(obra: Obra) {
    this.obra = obra;
    console.log(this.obra);

  }

  /*
  goToLink(url: string) {
    this.urlPdf = this.urlBaseImg+ url;
    
  }
*/
}
