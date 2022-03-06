import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, reduce } from 'rxjs/operators';
import { Equipe } from 'src/app/model/equipe';
import { Iequipe } from 'src/app/model/Iequipe';
import { Valores } from 'src/app/model/valor';
import { AlertService } from 'src/app/service/alert.service';
import { ValoresServiceService } from 'src/app/service/valores-service.service';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})


export class ValoresComponent implements OnInit {
  cartao: number;
  dinheiro: number;
  pix: number;
  picPay: number;
  vales: number;
  total: number;
  mascara: Iequipe[]
  equipes: Equipe[];
  valores: Valores[]
  v: Valores;
  formValores: FormGroup
  botaoValorAtrualizar: boolean = false;
  botaoValorSalvar: boolean = true;
  id: number;
  public paginaAtual = 1;

  deleteModelRef: BsModalRef;

  @ViewChild('deleteModel') deleteModal;
  @ViewChild('editModal') editModal;
  @ViewChild('salvarEdit') editarForm;

  constructor(
    private http: HttpClient,
    private service: ValoresServiceService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }


  ngOnInit(): void {

    this.formValores = new FormGroup({


      valor_cartao: new FormControl(''),
      valor_dinheiro: new FormControl(''),
      valor_pix: new FormControl(''),
      valor_pic_pay: new FormControl(''),
      data_valor: new FormControl(''),
      qtd_pessoas: new FormControl(''),
      id_valor: new FormControl('')

    })

    this.listaTotal();

    this.service.getEquipe().subscribe(
      res => this.equipes = res.valores_equipe

    )



    this.service.listaValores().subscribe(
      valores => this.valores = valores.valores
    )


  }


  salvarValores() {
    console.log(this.formValores.value);
    this.service.salvarValor(this.formValores.value).subscribe(
      (res) => {
        this.onRefresh();
        this.router.navigate(['dashboard'])
        this.alertService.sucess("Valor Salvo", "Resposta");
        this.formValores.reset()
      }

    )
  }
  onDelete(valores) {

    this.valores = valores;

    this.deleteModelRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  deletarValor(id: number) {
    console.log(id)
    this.service.deleteValor(id).subscribe(
      result => {
        console.log(id);
        console.log('excluído com sucesso', id)
        this.modalService.hide();
        this.onRefresh();
      }
    )

  }

  editarValor(valor) {

    console.log(valor);
    this.service.carregarPeloId(valor.id_valor).subscribe(
      data => {

        this.valores = data
        this.upDateForm(valor)
        this.botaoValorAtrualizar = true
        this.botaoValorSalvar = false



      }
    )


  }

  upDateForm(valores: Valores[]) {

    this.formValores.patchValue({
      valor_cartao: valores['valor_cartao'],
      valor_dinheiro: valores['valor_dinheiro'],
      valor_pix: valores['valor_pix'],
      valor_pic_pay: valores['valor_pic_pay'],
      qtd_pessoas: valores['qtd_pessoas'],
      data_valor: valores['data_valor'],
      id_valor: valores['id_valor']

    })

  }

  atualizarValor(valor: Valores[]) {
    let result$ = this.service.upDateValor(this.formValores.value);
    result$.subscribe(
      result => {
        this.alertService.sucess('Update', 'Atualizado com sucesso ')
        this.formValores.reset()
        this.onRefresh()
        this.botaoValorAtrualizar = false
        this.botaoValorSalvar = true

      }
    )
  }

  onRefresh() {

    this.service.listaValores().subscribe(
      valores => this.valores = valores.valores
    )
  }

  limparForm() {
    this.formValores.reset()
    this.botaoValorAtrualizar = false
    this.botaoValorSalvar = true
    this.onRefresh();
  }

  listaTotal() {
    this.service.listaValorCartaoServer().subscribe(
      res => {
        this.cartao = res['valores'].map(
          res => res.valor_cartao).reduce((a, b) => a + b, 0);
        this.dinheiro = res['valores'].map(
          res => res.valor_dinheiro).reduce((a, b) => a + b, 0);
        this.pix = res['valores'].map(
          res => res.valor_pix).reduce((a, b) => a + b, 0);
        this.picPay = res['valores'].map(
          res => res.valor_pic_pay).reduce((a, b) => a + b, 0);

        this.service.getEquipe().subscribe(
          res => {
            this.vales = res['valores_equipe'].map(
              res => res.pessoa_vale).reduce((a, b) => a + b, 0);
            this.total = this.cartao + this.dinheiro + this.pix + this.picPay - (this.vales);
            console.log(this.total)

          })



      }

    )
  }
}










