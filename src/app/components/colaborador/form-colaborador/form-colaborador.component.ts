import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Colaborador } from 'src/app/model/colaborador';
import { Gruja } from 'src/app/model/gruja';
import { Resposta } from 'src/app/model/resposta';
import { AlertService } from 'src/app/service/alert.service';
import { ColaboradorServiceService } from 'src/app/service/colaborador-service.service';




@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.css']
})


export class FormColaboradorComponent implements OnInit {
  
  form: FormGroup;
  nome:string;
  colaboradores: Colaborador[];
  gorjetas: Gruja[]
  respostas: Resposta[]
  
  public chave = false;

  constructor(private alertService: AlertService,
    private fb: FormBuilder,
    private server: ColaboradorServiceService,
    private http: HttpClient) {
    this.form = this.fb.group({

      nome: [''],
      setor: [''],
      colaborador_imagem: [null]
    })
    console.log(this.form)
  }

  ngOnInit(): void {
    if(this.chave == false){
      this.server.listColaborador().subscribe(data => this.colaboradores = data.colaboradores)

    }

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      colaborador_imagem: file
    });
    this.form.get('colaborador_imagem').updateValueAndValidity()
    console.log(this.form.get)
  }

  submitForm() {
    console.log(this.form.value)
    var formData: any = new FormData();
    formData.append("colaborador_imagem", this.form.get('colaborador_imagem').value);
    formData.append("setor", this.form.get('setor').value);
    formData.append("nome", this.form.get('nome').value);


    this.http.post('https://app-lucaback-end.herokuapp.com/colaborador', formData).subscribe(
      (response) => this.alertService.sucess("colaborador criado com sucesso", "resposta"),
      (error) => console.log(error)
    )
  }

  
  somaValorPeloNome(nome) {
    
    this.server.somaValorPeloNomeServer(nome).subscribe(
      o => this.respostas = o.gorjetas
    )
    this.chave = true;
  }

}
