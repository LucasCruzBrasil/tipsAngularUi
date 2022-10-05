import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrujaListaComponent } from './components/gruja-lista/gruja-lista.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficoComponent } from './graficos/grafico/grafico.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  
  {
    path: 'dashboard',
    canActivate: [AuthGuardService], component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
