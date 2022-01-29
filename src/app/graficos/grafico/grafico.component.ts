import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Gruja } from 'src/app/model/gruja';
import { GraficosService } from './graficos.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  gruja: Gruja[];
  chart:any;

  constructor(private service: GraficosService) { }



  ngOnInit(): void {
    this.service.dayliForecast().subscribe(res => {
      //console.log(res)
      let nome = res['gorjetas'].map(res => res.nome);
      let valor = res['gorjetas'].map(res => res.valor);
      let dt = res['gorjetas'].map(res => res.data);

     

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: nome,
          datasets: [
            {
              data:dt,
              borderColor: "blue",
              fill: true
            },
            {
              data: valor,
              borderColor: "green",
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
