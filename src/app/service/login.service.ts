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

  public fazerLogin (usuario: Usuario):Observable<ResponseLogin>{
     return this.httpClient.post<ResponseLogin>('http://localhost:3000/usuarios/login', usuario)
  }

  public cadastrarUsuario(usuario: Usuario){
       return this.httpClient.post('http://localhost:3000/usuarios/cadastro', usuario)
  }
}
