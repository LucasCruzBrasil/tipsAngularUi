import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  v: Valores;
  formValores: FormGroup
  botaoValor: boolean = false;
  
  public paginaAtual = 1;
  
  deleteModelRef: BsModalRef;

  @ViewChild('deleteModel') deleteModal;
  @ViewChild('editModal') editModal;

  constructor(
    private service: ValoresServiceService,
    private alertService: AlertService,
    private router: Router,
    private modalService: BsModalService) {
  }


  ngOnInit(): void {

    this.formValores = new FormGroup({
      //id_valor:new FormControl(''),
      valor_cartao: new FormControl(''),
      valor_dinheiro: new FormControl(''),
      valor_pix: new FormControl(''),
      valor_pic_pay: new FormControl(''),
      data_valor: new FormControl(''),
      qtd_pessoas: new FormControl('')

    })


    this.service.listaValores().subscribe(
      valores => this.valores = valores.valores
    )
  }


  salvarValores() {
    console.log(this.formValores.value);
    this.service.salvarValor(this.formValores.value).subscribe(
      (res) => {
        this.router.navigate(['dashboard'])
        this.alertService.sucess("Valor Salvo", "Resposta");
      }

    )
  }

  deletarValor() {
    this.deleteModelRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  editarValor(valor) {
    console.log(valor);
    this.service.carregarPeloId(valor.id_valor).subscribe(
      (data) => {
        this.upDateForm(valor)
        this.botaoValor = true;
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
      data_valor: valores['data_valor']

    })

  }

}










