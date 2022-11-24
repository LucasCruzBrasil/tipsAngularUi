import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EquipeComponent } from '../components/equipe/equipe/equipe.component';
import { ValoresComponent } from '../components/valores-diadia/valores/valores.component';
import { GraficoComponent } from '../graficos/grafico/grafico.component';
import { GraficosService } from '../graficos/grafico/graficos.service';
import { Colaborador } from '../model/colaborador';
import { Equipe } from '../model/equipe';
import { Gruja } from '../model/gruja';
import { Valores } from '../model/valor';
import { ValoresServiceService } from '../service/valores-service.service';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  valores: Valores[]
  gruja: Gruja[];
  equipe: Equipe[];
  chart:Chart
   @ViewChild(EquipeComponent) filhoEquipe: EquipeComponent
   @ViewChild(GraficoComponent) filhoGrafico: GraficoComponent
   @ViewChild(ValoresComponent) filhoValor: ValoresComponent
  constructor() { }

  ngOnInit(): void {
       
 }
 
 valor(valor){
  this.filhoEquipe.atulaizaValor();
  this.filhoEquipe.onReFresh();
  this.filhoValor.listaTotal();

 }

  valorB(valorB) {
    console.log(valorB)
    this.filhoGrafico.atualizaValorGrafico();
   
 } 
 
  
}




