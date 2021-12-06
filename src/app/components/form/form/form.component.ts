import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { first, map, switchMap } from 'rxjs/operators';
import { Colaborador } from 'src/app/model/colaborador';
import { Gruja } from 'src/app/model/gruja';
import { AlertService } from 'src/app/service/alert.service';
import { GrujaService } from 'src/app/service/gruja.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  colaboradores: Colaborador[];
  grujas: Gruja[];
  id_Selecionado = Gruja;
  form: FormGroup;
  submitted = false;
  id: number;
  x: any;

  constructor(
    private fb: FormBuilder,
    private service: GrujaService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: AlertService
  ) { }

  ngOnInit() {
    this.service.list().subscribe(data => this.grujas = data.gorjetas);
    this.listaColaborador();


    const gorjeta = this.route.snapshot.data['gorjeta']

    this.form = this.fb.group(
      {

        id_gruja: [gorjeta.id_gruja, Validators.required],
        id_colaborador: [gorjeta.id_colaborador, Validators.required],
        valor: [gorjeta.valor, Validators.required],
        data: [gorjeta.data, Validators.required]
      })

    console.log(this.form.value)

  }




  listaColaborador() {
    this.service.listColaborador().subscribe(
      colaboradorData => this.colaboradores = colaboradorData.colaboradores

    )
  }

  hasError(field: string) {
    return this.form.get(field).errors;

  }


  onSubmit() {
    this.submitted = true;

    console.log(this.form.value)
    console.log(this.form.value.id_gruja)
    if (this.form.valid) {

      console.log('submit');
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';

      if (this.form.value.id_gruja) {
        this.service.upDate(this.form.value).subscribe(
          sucesso => this.modal.sucess('Update', 'Atualizado com sucesso '),


        )
      }



    } else {
      this.service.create(this.form.value).subscribe(

        sucesses => this.router.navigate(['dashboard/Tips'])
        ,

        error => console.error(error),

        () => console.log('request ok')

      )

    }
  }

  

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['dashboard/Tips'])
    //console.log('cancel');
  }




}
