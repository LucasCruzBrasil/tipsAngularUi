import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GraficosService } from '../graficos/grafico/graficos.service';
import { Colaborador } from '../model/colaborador';
import { Equipe } from '../model/equipe';
import { Gruja } from '../model/gruja';
import { Valores } from '../model/valor';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  valores: Valores[]
  gruja: Gruja[];
  chart: any;
  equipe: Equipe[];

  constructor(private service: GraficosService) { }

  ngOnInit(): void {



  }
}




