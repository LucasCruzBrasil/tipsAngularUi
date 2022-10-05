import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseLogin } from '../model/ResponseLogin';
import { Usuario } from '../model/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  public URL = '/api'

  public fazerLogin(usuario: Usuario): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>('https://app-lucaback-end.herokuapp.com/usuarios/login', usuario)
      .pipe(
        tap((loginResponse) => (
          this.authService.loginResponse = loginResponse,
          console.log(this.authService.loginResponse)
          ))
      ) 
  }

  public cadastrarUsuario(usuario: Usuario) {
    return this.httpClient.post('https://app-lucaback-end.herokuapp.com/usuarios/cadastro', usuario)
  }
}
