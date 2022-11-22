import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Equipe } from 'src/app/model/equipe';
import { Iequipe } from 'src/app/model/Iequipe';
import { Valores } from 'src/app/model/valor';
import { AlertService } from 'src/app/service/alert.service';
import { ColaboradorServiceService } from 'src/app/service/colaborador-service.service';
import { ValoresServiceService } from 'src/app/service/valores-service.service';
import { EventEmitter } from  '@angular/core'

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
  valores: Valores[];
  
  v: Valores;
  formValores: FormGroup
  botaoValorAtrualizar: boolean = false;
  botaoValorSalvar: boolean = true;
  dias:any;
  id: number;
  dataSource: any;
  public paginaAtual = 1;
  deleteModelRef: BsModalRef;
  displayedColumns: string[] = [
    'valor_cartao', 
    'valor_dinheiro', 
    'valor_pix', 
    'valor_pic_pay', 
    'valor_total',
    'qtd_pessoas',
    'valor_individual',
    'botao_alterar',
    'botao_deletar'
  ];
 
  @Output() enviarValorParaOpai = new EventEmitter();
  @Output() atualizaGrafico = new EventEmitter();

  @ViewChild('deleteModel') deleteModal;
  @ViewChild('editModal') editModal;
  @ViewChild('salvarEdit') editarForm;
 

  constructor(
    private http: HttpClient,
    private colaboradorService: ColaboradorServiceService,

    private service: ValoresServiceService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }
  
  dateToIsoFormat(date: Date): string {
    if ( date ) {
      return new Date(date).toISOString().split('T')[0];
    }
    
    return null;
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
      res =>{
         this.equipes = res.valores_equipe
        }

    )



    this.service.listaValores().subscribe(
      valores => {
        this.valores = valores['valores']
        this.dataSource = new MatTableDataSource(this.valores);
        //this.valores['data_valor'] = valores['valores'].map(res => res.data_valor.split("T")[0])
      },
      
     
    )
 
       this.listaData()
  }
   
  listaData() {
    this.service.listaValores().subscribe(
      res => {
        this.dias =res['valores'].map(res => res.data_valor.split("T")[0])
        console.log(this.dias)
      }
    )
  }

  

  salvarValores() {
    console.log(this.formValores.value);
    this.service.salvarValor(this.formValores.value).subscribe(
      (res) => {
       this.enviarValorParaOpai.emit(res);
       this.atualizaGrafico.emit(res);
       //this.router.navigate(['dashboard']);
        this.alertService.sucess("Valor Salvo", "Resposta");
        this.formValores.reset();
        this.onRefresh();
        this.listaTotal()
      },
      

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
        this.enviarValorParaOpai.emit(result);
        this.atualizaGrafico.emit(result);
        console.log(id);
        console.log('excluído com sucesso', id)
        this.modalService.hide();
        this.onRefresh();
        this.listaTotal();
      }
    )

  }
 
  fecharModal(){
    this.modalService.hide();
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
        this.enviarValorParaOpai.emit();
        this.atualizaGrafico.emit();
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
      valores => this.valores = valores['valores']
    )
  }

  limparForm() {
    this.formValores.reset()
    this.botaoValorAtrualizar = false
    this.botaoValorSalvar = true
    this.onRefresh();
  }

  listaTotal() {
    this.service.listaValores().subscribe(
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










