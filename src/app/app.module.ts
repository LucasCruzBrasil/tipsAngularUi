import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, DatePickerComponent } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard/dashboard.module';
import { FormTipComponent } from './components/form-tip/form-tip.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { FormColaboradorComponent } from './components/colaborador/form-colaborador/form-colaborador.component';
import { FiltroComponent } from './components/filtro/filtro/filtro.component';
import { FormComponent } from './components/form/form/form.component';
import { GrujaListaComponent } from './components/gruja-lista/gruja-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormTipComponent,
    
    
    

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule,
    BrowserAnimationsModule,
    DashboardModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,

  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
