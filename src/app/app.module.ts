import { LoginComponent } from './login/login/login.component';


import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, es_ES, en_US } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ToastrModule } from 'ngx-toastr';

import en from '@angular/common/locales/en';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';

import localeES from '@angular/common/locales/es';
import { NgxSpinnerModule } from 'ngx-spinner';

registerLocaleData(localeES, 'es');




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    NgxSpinnerModule,
     MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()

  ],
  providers: [
   
    { provide: LOCALE_ID, useValue: 'es' },
    //{ provide: NZ_I18N, useValue: LOCALE_ID },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
/*function localeES(localeES: any, arg1: string) {
  throw new Error('Function not implemented.');
}*/

