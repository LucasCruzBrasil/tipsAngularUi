import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Valores } from 'src/app/model/valor';
import { AlertService } from 'src/app/service/alert.service';
import { ValoresServiceService } from 'src/app/service/valores-service.service';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  valores: Valores[];
  formValores: FormGroup
  public paginaAtual = 1;
  constructor(private fb: FormBuilder, private service: ValoresServiceService, private http: HttpClient, private alertService: AlertService) {


  }




  ngOnInit(): void {
    
    this.formValores = new FormGroup({
      valor_cartao: new FormControl(''),
      valor_dinheiro:new FormControl(''),
      valor_pix:new FormControl(''),
      valor_pic_pay:new FormControl(''),
      data_valor:new FormControl(''),
      qtd_pessoas:new FormControl('')

    })

    this.service.listaValores().subscribe(
      valores => this.valores = valores.valores
    )




  }

  
  salvarValores(){
    console.log(this.formValores.value);
    this.service.salvarValor(this.formValores.value).subscribe(
    res =>  console.log('Post created successfully!')
    )
  }


  }


  







