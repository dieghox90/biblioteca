import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { MaterialTipoComponent } from './materiales/material-tipo/material-tipo.component';
import { MaterialUnidadComponent } from './materiales/material-unidad/material-unidad.component';
import { RolesComponent } from './usuarios/roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './obra/form/form.component';
import { TipoComponent } from './obra/tipo/tipo.component';
import { AutorComponent } from './obra/autor/autor.component';
import { ListaComponent } from './obra/lista/lista.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';

import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    FormUsuarioComponent,
    ListaUsuariosComponent,
    ListaComponent,
    MaterialTipoComponent,
    MaterialUnidadComponent,
    RolesComponent,
    FormComponent,
    TipoComponent,
    AutorComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    NzDatePickerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    NgxSpinnerModule
  ],
  providers: [
    DatePipe
  ]
})
export class AdminModule { }
