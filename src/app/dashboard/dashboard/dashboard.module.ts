import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard.component';
import { GrujaListaComponent } from 'src/app/components/gruja-lista/gruja-lista.component';
import { FormColaboradorComponent } from 'src/app/components/colaborador/form-colaborador/form-colaborador.component';
import { FiltroComponent } from 'src/app/components/filtro/filtro/filtro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    GrujaListaComponent,
    DashboardComponent,
    FiltroComponent,
    FormColaboradorComponent,
    FormComponent,
  ],


  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule
  ]

})
export class DashboardModule { }
