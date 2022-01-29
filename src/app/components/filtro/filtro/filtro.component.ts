import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Colaborador } from 'src/app/model/colaborador';
import { Filtro } from 'src/app/model/filtro';
import { Gruja } from 'src/app/model/gruja';
import { Resposta } from 'src/app/model/resposta';
import { ColaboradorServiceService } from 'src/app/service/colaborador-service.service';
import { FiltroService } from 'src/app/service/filtro.service';
import { GrujaService } from 'src/app/service/gruja.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  grujas: Gruja[]=[];
  value: Date;
  colaborador: Colaborador[];
  filtros: Filtro[]=[];
  form:FormGroup;
  queryField = new FormControl();
  nome:string;
  respostas: Resposta[]
  results$:Observable<any>
  public chave = false;
  
  constructor(
    private filtroService: FiltroService, 
    private grujaService: GrujaService, 
    private fb:FormBuilder,
    private server: ColaboradorServiceService) { }
  



  public ativador = false;

  ngOnInit() {
     
   
  }


  buscarPeloNome(nome) {
   
    console.log(nome)
 
    this.grujaService.buscaPeloNomeServer(nome).subscribe(
      result => this.filtros = result.gorjetas,
      gorjetas => this.filtros = gorjetas.json
    )
     
   }
  
onDigit() {
  console.log(this.queryField.value)
   this.grujaService.buscaPeloNomeServer(this.queryField.value).subscribe(
    result => this.filtros = result.gorjetas,
    gorjetas => this.filtros = gorjetas.json
  )
}
somaValorPeloNome(nome) {
    
  this.server.somaValorPeloNomeServer(nome).subscribe(
    o => this.respostas = o.gorjetas
  )
  this.chave = true;
}
}

