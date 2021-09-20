import { Component, OnInit, ViewChild } from '@angular/core';
import { Obra } from 'src/app/Models/obra';
import { environment } from 'src/environments/environment';
import { ObraService } from '../../Services/obra.service';


import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  obras: Obra[] = [];

  urlBaseImg = environment.baseUrlImg;

  urlPdf: string = "";

  @ViewChild('dt') dt: Table | undefined;


  constructor(
    private service: ObraService,
    private spinner: NgxSpinnerService
  ) {
    this.obras = [];
  }

  ngOnInit(): void {

    this.spinner.show();
    this.service.listar().subscribe(o => {
      this.obras = o;
      this.spinner.hide();
    });


  }


  goToLink(url: string) {
    this.urlPdf = this.urlBaseImg + url;
    console.log(this.urlPdf);
  }


  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }

}
