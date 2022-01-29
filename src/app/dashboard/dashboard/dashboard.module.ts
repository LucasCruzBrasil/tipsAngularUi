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
import { GraficoComponent } from 'src/app/graficos/grafico/grafico.component';
import { GraficosService } from 'src/app/graficos/grafico/graficos.service';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    GrujaListaComponent,
    DashboardComponent,
    FiltroComponent,
    FormColaboradorComponent,
    FormComponent,
    GraficoComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule,
    NgxPaginationModule
  ],
  providers: [GraficosService]
})
export class DashboardModule { }
