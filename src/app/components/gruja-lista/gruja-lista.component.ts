import { Component, OnInit, ViewChild } from '@angular/core';
import { Colaborador } from 'src/app/model/colaborador';
import { Gruja } from 'src/app/model/gruja';
import { GrujaService } from 'src/app/service/gruja.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { empty, Observable, pipe } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { identifierName } from '@angular/compiler';
import { Filtro } from 'src/app/model/filtro';



@Component({
  selector: 'app-gruja-lista',
  templateUrl: './gruja-lista.component.html',
  styleUrls: ['./gruja-lista.component.css']
})
export class GrujaListaComponent implements OnInit {

  grujas: Gruja[];
  deleteModelRef: BsModalRef;
  gorjetaSelecionada: Gruja;
  alertService: AlertService;
  upDateModalref: BsModalRef;
  public paginaAtual = 1;
  
  @ViewChild('deleteModel') deleteModal;

  colaborador: Colaborador[];

  constructor(
    private service: GrujaService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router


  ) { }

  ngOnInit(): void {


    this.onRefresh()

  }



  onRefresh() {
    this.service.list().subscribe(data => this.grujas = data.gorjetas);
  }
  //metodo do botão da lista para chamar o modal passndo o id 
  onDelete(gorjetas) {

    this.gorjetaSelecionada = gorjetas

    this.deleteModelRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  onConfirmeDelete(id: number): void {
    console.log(id);
    this.service.deleteGruja(id).subscribe(
      result => {
        console.log(id);
        console.log('excluído com sucesso', id)
        this.modalService.hide();
        this.onRefresh();
      }
    )


  }

  onDeclinedelete() {
    this.deleteModelRef.hide();
  }


  getUpToUpDate(id) {
    console.log(id)
   this.router.navigate(['editar', id], {relativeTo: this.route})
     console.log( this.router.navigate(['editar', id], {relativeTo: this.route}))
  }


}
