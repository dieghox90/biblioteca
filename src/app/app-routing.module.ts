import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  {
    path: 'admin',
    loadChildren: () => import('./administrador/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m=>m.SharedModule)
  },
  
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },

  { path: 'login',   component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
