import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrujaListaComponent } from './components/gruja-lista/gruja-lista.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficoComponent } from './graficos/grafico/grafico.component';

const routes: Routes = [
  {path:'', component:LoginComponent
  
} ,
{
  path:'dashboard', component:GraficoComponent,
 loadChildren:()=> import('./dashboard/dashboard/dashboard.module').then((m) => m.DashboardModule) 
} 

 







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
