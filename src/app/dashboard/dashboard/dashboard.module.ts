import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard.component';
import { GrujaListaComponent } from 'src/app/components/gruja-lista/gruja-lista.component';
import { FormColaboradorComponent } from 'src/app/components/colaborador/form-colaborador/form-colaborador.component';
import { FiltroComponent } from 'src/app/components/filtro/filtro/filtro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormTipComponent } from 'src/app/components/form-tip/form-tip.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { FormComponent } from 'src/app/components/form/form/form.component';



@NgModule({
  declarations: [
   
    FormColaboradorComponent,
   
    FiltroComponent,
    FormTipComponent,
   
    FormComponent,
    DashboardComponent,
    GrujaListaComponent
    
   
  ],
  imports: [
    
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ]

})
export class DashboardModule { }
