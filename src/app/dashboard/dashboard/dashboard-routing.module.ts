import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormColaboradorComponent } from 'src/app/components/colaborador/form-colaborador/form-colaborador.component';
import { FormComponent } from 'src/app/components/form/form/form.component';
import { GrujaResolverGuard } from 'src/app/components/form/form/guards/gruja-resolver.guard';
import { GrujaListaComponent } from 'src/app/components/gruja-lista/gruja-lista.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GraficoComponent } from 'src/app/graficos/grafico/grafico.component';
import { ValoresComponent } from 'src/app/components/valores-diadia/valores/valores.component';
import { DashboardComponent } from '../dashboard.component';
import { PixComponent } from 'src/app/components/pix-integracao/pix/pix.component';
import { EquipeComponent } from 'src/app/components/equipe/equipe/equipe.component';

const routes: Routes = [
  
 
  {path:'grafico', component:GraficoComponent},
  {path:'valores', component:ValoresComponent},
  {path:'colaborador', component:FormColaboradorComponent},
  {path:'pix', component:PixComponent},
  {path:'equipe', component:EquipeComponent},



  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
