import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { DashboardComponent } from '../dashboard.component';
import { GrujaListaComponent } from 'src/app/components/gruja-lista/gruja-lista.component';
import { FormColaboradorComponent } from 'src/app/components/colaborador/form-colaborador/form-colaborador.component';
import { FiltroComponent } from 'src/app/components/filtro/filtro/filtro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GraficoComponent } from 'src/app/graficos/grafico/grafico.component';
import { GraficosService } from 'src/app/graficos/grafico/graficos.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ValoresComponent } from 'src/app/components/valores-diadia/valores/valores.component';
import localePT from '@angular/common/locales/pt';
import { EquipeComponent } from 'src/app/components/equipe/equipe/equipe.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';



registerLocaleData(localePT);

@NgModule({
  declarations: [
    GrujaListaComponent,
    DashboardComponent,
    FiltroComponent,
    FormColaboradorComponent,
    FormComponent,
    GraficoComponent,
    ValoresComponent,
    EquipeComponent



  ],


  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    

    
    


  ],
  providers: [GraficosService]
})
export class DashboardModule { }
