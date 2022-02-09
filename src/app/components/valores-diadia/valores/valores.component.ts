import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {


  formValores: FormGroup

  constructor(private fb: FormBuilder) { }
   
  ngOnInit(): void {

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
