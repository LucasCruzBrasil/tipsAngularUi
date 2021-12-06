import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { Usuario } from 'src/app/model/usuario';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;


  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario()
  }
  fazerLogin() {
    this.loginService.fazerLogin(this.usuario).subscribe((data) => {
        this.router.navigate(['dashboard']);
    },
      (httpError) => {
        this.alertService.error(httpError.error.mensagem);
      }

    )
  }

  cadastrar(){
    this.loginService.cadastrarUsuario(this.usuario).subscribe(
      secesso => this.alertService.sucess('Cadastro', 'Cadastro realizado com sucesso'),
     
      (httpError) => {
        this.alertService.error(httpError.error.mensagem);
      }

    )
  }
  
}
