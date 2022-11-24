import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import { Colaborador } from 'src/app/model/colaborador';
import { Equipe } from 'src/app/model/equipe';
import { Valores } from 'src/app/model/valor';
import { ColaboradorServiceService } from 'src/app/service/colaborador-service.service';
import { ValoresServiceService } from 'src/app/service/valores-service.service';
import { OrderModule } from 'ngx-order-pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/service/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatMenuTrigger } from '@angular/material/menu';

interface X {
  nome: string,
  data_valor: string,
  valor_individual: number
  valor_total: number
  vale_do_dia: number
  pessoa_vale:number
}




@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})


export class EquipeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  




  ngAfterViewInit() {
  }

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;

  lista: X[];
  nome: string
  data: Date[]
  valores$: Valores[]

  colaborador: Colaborador[];
  equipe: Equipe[]
  equipeSelecionada: Equipe
  text: string;
  textoFiltro: string
  results: string[];
  formEquipe: FormGroup
  formEquipeModel:FormGroup
  displayedColumns: string[] = ['Nome', 'Data', 'Total', 'Individual', 'Alterar', 'Deletar']
  dataSource: any;
  BrutoPessoa: number
  liquidoPessoa: number
  valePessoa: any
  mostraPesquisa: boolean = false;
  deleteModelRef: BsModalRef;
  editModalRef: BsModalRef;
  
  @Input() informacaoFilho : string;
  @ViewChild('deleteModel') deleteModal;
  @ViewChild('editModel') editModal;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(
    private service: ValoresServiceService,
    private colaboradorService: ColaboradorServiceService,
    private alertService: AlertService,
    private modalService: BsModalService,
    public dialog: MatDialog

  ) { }



  ngOnInit(): void {

    this.formEquipe = new FormGroup({
      id_valor: new FormControl(''),
      id_colaborador: new FormControl(''),
      pessoa_vale: new FormControl(''),
      porcentagem: new FormControl('')
    })

    this.formEquipeModel = new FormGroup ({
      pessoa_vale: new FormControl(''),
      porcentagem: new FormControl(''),
      id_equipe: new FormControl('')
    })


    this.service.listaValores().subscribe(
      res => {
        this.valores$ = res['valores']
      

      }
    )


    this.onReFresh();

    this.colaboradorService.listColaborador().subscribe(
      res => {
        this.colaborador = res['colaboradores']

      }
    )


    this.ngAfterViewInit();

  }


  insereColaboradorNaEquipe() {
    this.colaboradorService.insereColabradorNaEquipe(this.formEquipe.value).subscribe(
      res => {
        console.log(res),
          this.onReFresh();
        this.formEquipe.reset();
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  atulaizaValor(){
    this.service.listaValores().subscribe(
     res => {
      this.valores$ = res['valores'];
     }
    )
   }

  onReFresh() {
    this.service.getEquipe().subscribe(
      res => {
        this.equipe = res['valores_equipe'],
          this.dataSource = new MatTableDataSource(this.equipe);
        this.dataSource.paginator = this.paginator;
      })



  }


  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }


  filtro(nome) {
    this.mostraPesquisa = true;
    this.text = nome;
    this.service.getEquipe().subscribe(

      res => {
        this.lista = res['valores_equipe'].filter(res => res.nome == nome)

        this.BrutoPessoa = res['valores_equipe'].filter(res => res.nome == nome).map(res => res.valor_individual).reduce((a, b) => a + b, 0);
        this.valePessoa = res['valores_equipe'].filter(res => res.nome == nome).map(res => res.pessoa_vale).reduce((a, b) => a + b, 0);
        console.log(this.valePessoa)
        this.liquidoPessoa = this.BrutoPessoa - this.valePessoa

        if (this.liquidoPessoa > 0) {
          this.textoFiltro = 'Esses são os valores da semana'
        } else {
          this.textoFiltro = 'Esse nome não existe na tabela'
        }
        console.log(this.liquidoPessoa)




      }
    )
  }

  onDelete(equipe) {
    this.equipeSelecionada = equipe;
    this.deleteModelRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  onEdit(equipe) {
    this.equipeSelecionada = equipe;
    this.editModalRef = this.modalService.show(this.editModal, {class: 'modal-sm'})
    this.service.carregarEquipePeloId(equipe.id_equipe).subscribe(
      data => {
        this.equipe = data
        this.upDateForm(equipe)
      }
    )
     
  }

 

  atualizarValorEquipe(equipe: Equipe[]) {
    console.log(equipe)
    let result$ = this.service.upDateValorEquipe(this.formEquipeModel.value)
      result$.subscribe( 
        result => {
          console.log(result);
          this.alertService.sucess('Update', 'Atualizado com sucesso ')
          this.formEquipeModel.reset()
          this.onReFresh();
          this.modalService.hide();

      })
    
  }

  upDateForm(equipe: Equipe[]) {
    this.formEquipeModel.patchValue({
       porcentagem: equipe['porcentagem'],
       pessoa_vale: equipe['pessoa_vale'],
       id_equipe: equipe['id_equipe']
 
     })
  }

  fecharModal(){
    this.modalService.hide();
  }

  onConfirmeDelete(id: number): void {
    console.log(id);
    this.colaboradorService.deletaColaboradorNaEquipe(id).subscribe(
      result => {
        console.log(id);
        console.log('excluído com sucesso', id)
        this.modalService.hide();
        this.onReFresh();
      }
    )


  }

  onDeclinedelete() {
    this.deleteModelRef.hide();
  }
 
}
