import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Gruja } from 'src/app/model/gruja';
import { GraficosService } from './graficos.service';
import { Chart, registerables } from 'chart.js';
import { Valores } from 'src/app/model/valor';
import { Equipe } from 'src/app/model/equipe';
import { splitAtColon } from '@angular/compiler/src/util';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  valores:Valores[]
  gruja: Gruja[];
  chart:any;
  equipe:Equipe[];

  constructor(private service: GraficosService) { }

 

  ngOnInit(): void {
    
    this.service.dayliForecast().subscribe(res => {
     
      let total = res['valores'].map(res => res.total);
      let valor = res['valores'].map(res => res.valor_cartao);
      let dt = res['valores'].map(res => res.data_valor.split("T")[0]);
      let dinheiro = res['valores'].map(res => res.valor_dinheiro);
      let valor_individual = res['valores'].map(res => res.valor_individual);
      let valor_pix = res['valores'].map(res => res.valor_pix);


     

      this.chart = new Chart('canvas', {

        type: 'line',
        data: {
          labels:dt,
          datasets: [
            {
              label:"Total",
              data:total,
              borderColor: "blue",
              fill: true
            },
            {
              label:"Valor Cartão",
              data: valor,
              borderColor: "green",
              fill: true
            }, 
            
            {
              label:"Valor individual",
              data: valor_individual,
              borderColor: "red",
              fill: true
            }, 
            {
              label:"Valor Dinheiro",
              data: dinheiro,
              borderColor: "purple",
              fill: true
            }, 
             
            {
              label:"Valor Pix",
              data:valor_pix,
              borderColor: "black",
              fill: true
            }, 
            
          ]
        }, 
        

        options: {
          scales: {
            
            
            y: {
              
              
              max: 1000,
              min: 0,
              ticks: {
                  stepSize:1
              }
          },
            x: {
              stacked: false
              
            }
          }
        }

      });

    })

  }

}
