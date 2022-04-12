import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Gruja } from 'src/app/model/gruja';
import { GraficosService } from './graficos.service';
import { Chart, registerables } from 'chart.js';
import { Valores } from 'src/app/model/valor';
import { Equipe } from 'src/app/model/equipe';
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
      //console.log(res)
      let nome = res['valores'].map(res => res.total);
      let valor = res['valores'].map(res => res.valor_cartao);
      let dt = res['valores'].map(res => res.valor_dinheiro);
      let valor_individual = res['valores'].map(res => res.qtd_pessoas);

     

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: nome,
          datasets: [
            {
              label:"Valor Dinheiro",
              data:dt,
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
              label:"Quantidade de Pessoas",
              data: valor_individual,
              borderColor: "red",
              fill: true
            }, 
          ]
        }, 
        

        options: {
          scales: {
            
            y: {
              max: 700,
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
