import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColaboradorComponent } from './components/colaborador/form-colaborador/form-colaborador.component';
import { FormComponent } from './components/form/form/form.component';
import { GrujaListaComponent } from './components/gruja-lista/gruja-lista.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent,
  
} ,
{
  path:'dashboard',
  loadChildren:()=> import('./dashboard/dashboard/dashboard.module').then((m) => m.DashboardModule) 
} 
 








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
