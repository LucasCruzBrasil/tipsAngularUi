import { Injectable } from '@angular/core';
import { ResponseLogin } from '../model/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginResponse: ResponseLogin

  public clear(): void {
    this.loginResponse = undefined
  }

  public isAuthenticate(): boolean {
    return Boolean(this.loginResponse?.token)
  }

  public salvaLocal(token:string) {
    localStorage.setItem('token', token)
    
  }

  public loggedIn(){
    return localStorage.getItem('token')

  }

  
}
