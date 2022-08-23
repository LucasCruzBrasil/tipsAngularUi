import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ListaPagamentos } from '../model/listaPagamentos';
import { Pix } from '../model/pix';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  pix: Pix;
  pagamentos: ListaPagamentos;


  public URL = 'https://api-integracao-mercadopago.herokuapp.com'

  constructor(private http: HttpClient) { }

  QrServer(pix: Pix[]) {
    return this.http.post(this.URL + '/process_payment', pix).pipe(
      tap(console.log)
    )
  }

  listaValores(): Observable<ListaPagamentos[]> {
    return this.http.get<ListaPagamentos[]>(this.URL + '/pagamentos').pipe(
      tap(console.log)
    )
  }

  carregarPeloId(id_pagamento): Observable<ListaPagamentos[]> {
    return this.http.get<ListaPagamentos[]>(this.URL + '/pagamentos/' + id_pagamento).pipe(
      tap(console.log),
      catchError(this.handleError)

    )

  }

  //
  notificaçãoMercadoPago(resposta) {
    return this.http.post(this.URL + '/not', resposta).pipe(
      tap(console.log)
    )
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
