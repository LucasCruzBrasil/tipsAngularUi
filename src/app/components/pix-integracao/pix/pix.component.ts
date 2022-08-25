import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { retryWhen } from 'rxjs/operators';
import { ListaPagamentos } from 'src/app/model/listaPagamentos';
import { Pix } from 'src/app/model/pix';
import { responsePix } from 'src/app/model/responsePix';
import { AlertService } from 'src/app/service/alert.service';
import { PixService } from 'src/app/service/pix.service';
import { Validacoes } from '../validacoes';



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
  qr: responsePix['qrCodeBase64']
  external_reference: responsePix
  on: boolean = false;
  listaPagamentos: ListaPagamentos[];
  listaPagamentosAprovados: ListaPagamentos[];
  recebedorTips: any;
  valorTips: any;
  n: any;

  buscaPagamentoAprovado: any;

  constructor(private pixService: PixService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.listaPagamentosCliente();
    this.creatForm();
    this.formPix = new FormGroup({

      transaction_amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      payment_method_id: new FormControl('Pix'),

      payer: new FormGroup({
        email: new FormControl('teste@gmail.com', [Validators.required, Validators.email]),

        first_name: new FormControl('Teste', [Validators.required, Validators.minLength(1)]),
        last_name: new FormControl('Testando', [Validators.required, Validators.minLength(1)]),

        identification: new FormGroup({
          type: new FormControl('CPF'),
          number: new FormControl('03850973027', [Validators.required, Validacoes.ValidaCpf])
        })

      })




    })

  }

  creatForm() {
    this.formPix = new FormGroup({

      transaction_amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      payment_method_id: new FormControl('Pix'),

      payer: new FormGroup({
        email: new FormControl(''/* , [Validators.required, Validators.email] */),

        first_name: new FormControl(''/* , [Validators.required, Validators.minLength(1)] */),
        last_name: new FormControl('', [Validators.required, Validators.minLength(1)]),

        identification: new FormGroup({
          type: new FormControl('CPF'),
          number: new FormControl('', [Validators.required, Validacoes.ValidaCpf])
        })

      })




    })


  }

  listaPagamentosCliente() {
    this.pixService.listaValores().subscribe(
      pagamentos => {
        this.listaPagamentos = pagamentos['pagamentos']
      }
    )
  }

  onRefresh() {
    this.pixService.listaValores().subscribe(
      pagamentos => {
        this.listaPagamentos = pagamentos['pagamentos']
      }
    )
  }

  resetForm() {
    this.formPix.reset(
      {
        transaction_amount: 0,
        description: 'Escolha Alguém',
        payment_method_id: 'PIX',
        payer: {
          email: 'lucas@hotmail.com',
          first_name: 'João',
          last_name: 'Barcelos',
          identification: {
            type: "CPF",
            number: '37905027038'
          }
        }
      }
    );
  }

  gerarQr(pix: Pix[]) {
    console.log(this.formPix.value);

    this.m = this.formPix.value;


    this.pixService.QrServer(this.m).subscribe(

      res => {
        this.respostaPix = res
        this.external_reference = res.external_reference
        this.on = true;
        this.qr = this.respostaPix.qrCodeBase64
        this.recebedorTips = this.respostaPix.description
        this.valorTips = this.respostaPix.amount
        console.log(this.qr);
      }

    ), (httpError) => {
      this.alertService.error(httpError.error.mensagem);
    }

    this.buscaPagamentoAprovado = setTimeout(() => {
      this.pixService.carregarPeloId(this.external_reference).subscribe(

        res => {
          this.alertService.sucess('Pago', 'pagamento concluído com sucesso. ')
          this.on = false
          this.formPix.reset({ transaction_amount: 0 });
          this.resetForm();
          this.onRefresh();
         
          console.log('salvou')
        },

        error => {
          this.alertService.info('Cancelado', 'pagamento cancelado. ')
          this.on = false
          this.resetForm();
          this.onRefresh();
        }
      )

    }, 10000)
  }

  cancelarQr() {
    this.on = false
    this.onRefresh();

  }



}
