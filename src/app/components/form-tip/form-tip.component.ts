import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-tip',
  templateUrl: './form-tip.component.html',
  styleUrls: ['./form-tip.component.css']
})
export class FormTipComponent implements OnInit {

  public credicardTaxa = 0.0499;
  public debitocardTaxa = 0.0199;
  public dinheiro = 0;
  public valorCredito: number;
  public valorDebito: number;
  public valorDinheiro: number;

  constructor() { }

  ngOnInit(): void {
  }

  calculoCredito(valorCredito) {
    let diminuiTaxa = this.credicardTaxa;
    let resultaxa = this.valorCredito * diminuiTaxa;

    let creditoLiquido = valorCredito - resultaxa;
    console.log(creditoLiquido);
    return creditoLiquido;
  }

  calculoDebito(valorDebito) {
     let diminuiTaxa = this.debitocardTaxa;
     let resultaxaDoDebito = this.valorDebito * diminuiTaxa;
     let debitoLiquido = this.valorDebito - resultaxaDoDebito;
     console.log(debitoLiquido);
     return debitoLiquido;
  }

  calculoDinheiro(valorDinheiro){
    console.log(valorDinheiro)
   return valorDinheiro;
  
  }


}
