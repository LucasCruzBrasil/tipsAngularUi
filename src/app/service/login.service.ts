import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../model/ResponseLogin';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  public URL = '/api'

  public fazerLogin (usuario: Usuario):Observable<ResponseLogin>{
     return this.httpClient.post<ResponseLogin>('https://app-lucaback-end.herokuapp.com/usuarios/login', usuario)
  }

  public cadastrarUsuario(usuario: Usuario){
       return this.httpClient.post('https://app-lucaback-end.herokuapp.com/usuarios/cadastro', usuario)
  }
}
