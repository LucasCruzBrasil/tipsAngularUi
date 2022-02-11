import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Valores } from 'src/app/model/valor';
import { ValoresServiceService } from 'src/app/service/valores-service.service';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  valores:Valores
  formValores: FormGroup

  constructor(private fb: FormBuilder, private service:ValoresServiceService) { }
   
  ngOnInit(): void {
     this.service.listaValores().subscribe(
          data => this.valores = data.valores
     )


    this.formValores = this.fb.group({
      valor_cartao: [null],
      valor_dinheiro: [null],
      valor_pix:[null],
      valor_pic_pay:[null],
      valor_data:[null],
      pessoas_qtd:[null],

    })

    console.log(this.formValores.value)
  }

  salvarValores(){
    
  }


      
}
