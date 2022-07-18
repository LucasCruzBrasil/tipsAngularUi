import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pix } from 'src/app/model/pix';
import { responsePix } from 'src/app/model/responsePix';
import { AlertService } from 'src/app/service/alert.service';
import { PixService } from 'src/app/service/pix.service';



export interface Ipix {
  transaction_amount: number;
  description: string;
  payment_method_id: "pix"
  payer: {
    email: string,
    first_name: string,
    last_name: string,
    identification: {
      type: "CPF",
      number: number
    }
  }
}



@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})


export class PixComponent implements OnInit {

  payer: FormGroup
  formPix: FormGroup
  identification: FormGroup
  pix: Pix[];
  m: Ipix[];
  respostaPix: responsePix
  qr:responsePix['qrCodeBase64']

  constructor(private pixService: PixService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.formPix = new FormGroup({

      transaction_amount: new FormControl(''),
      description: new FormControl(''),
      payment_method_id: new FormControl('Pix'),

      payer: new FormGroup({
        email: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),

        identification: new FormGroup({
          type: new FormControl('CPF'),
          number: new FormControl('')
        })

      })




    })

  }

  creatForm(pix: Ipix) {
    this.formPix = new FormGroup({

      transaction_amount: new FormControl(''),
      description: new FormControl(''),
      payment_method_id: new FormControl('Pix'),

      payer: new FormGroup({
        email: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),

        identification: new FormGroup({
          type: new FormControl('CPF'),
          number: new FormControl('')
        })

      })
    })


  }

  gerarQr(pix: Pix[]) {
    console.log(this.formPix.value);
    
    this.m = this.formPix.value;
    
    this.pixService.QrServer(this.m).subscribe(

      res => {
        this.respostaPix = res
        this.qr = this.respostaPix.qrCodeBase64
        console.log(this.qr); 
      }
    ),(httpError) => {
      this.alertService.error(httpError.error.mensagem);
    }

  }

}
