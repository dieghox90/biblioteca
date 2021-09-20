
import { MaterialTipoComponent } from './materiales/material-tipo/material-tipo.component';
import { MaterialUnidadComponent } from './materiales/material-unidad/material-unidad.component';
import { NgModule } from '@angular/core';
import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { RolesComponent } from './usuarios/roles/roles.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './obra/form/form.component';
import { ListaComponent } from './obra/lista/lista.component';
import { TipoComponent } from './obra/tipo/tipo.component';
import { AutorComponent } from './obra/autor/autor.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nuevo-usuario',
        component:FormUsuarioComponent
      },
      {
        path: 'editar-usuario/:id',
        component:FormUsuarioComponent
      },
      {
        path: 'lista-usuarios',
        component:ListaUsuariosComponent
      },

      {
        path: 'usuarios-inactivos',
        component:ListaUsuariosComponent
      },
  
 
      {
        path: 'roles',
        component: RolesComponent
      },

      {
        path: 'nueva-obra',
        component: FormComponent
      },

      {
        path: 'editar-obra/:id',
        component: FormComponent
      },

      {
        path: 'lista-obras',
        component: ListaComponent
      },
      {
        path: 'tipo-obra',
        component: TipoComponent
      },
      {
        path: 'autores',
        component: AutorComponent
      },
      {
        path: '**',
        redirectTo:'nuevo'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
