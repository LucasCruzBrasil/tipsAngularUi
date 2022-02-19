import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Valores } from '../model/valor';

@Injectable({
  providedIn: 'root'
})
export class ValoresServiceService {
  valores:Valores[];
  
  public URL = '/api'

  constructor(private http: HttpClient) { }


  listaValores(){
    return this.http.get<Valores>(this.URL+ '/valores').pipe(tap(console.log))
  }

  salvarValor(valores: Valores[]){
    return this.http.post(this.URL + '/valores', valores).pipe(
      tap(console.log)
    )

  }

  carregarPeloId(id_valor){
    return this.http.get<Valores>(this.URL + '/valores/'+ id_valor).pipe(tap(console.log))

  }

  upDateValor(valor) :Observable<any> {
    return this.http.patch<any>(this.URL+ '/valores/', valor).pipe(tap(console.log))
  }

}
