import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, throwError, TimeInterval, timer } from 'rxjs';
import { catchError, concatMap, delay, delayWhen, map, retry, retryWhen, scan, take, tap } from 'rxjs/operators';
import { joinPagamentos } from '../model/joinPagamentos';
import { ListaPagamentos } from '../model/listaPagamentos';
import { Pix } from '../model/pix';

@Injectable({
  providedIn: 'root'
})
export class PixService {
  pix: Pix;
  pagamentos: ListaPagamentos;


  public URL = 'https://app-lucaback-end.herokuapp.com/pagar'

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


  listaPagamentosJoin(): Observable<joinPagamentos[]> {
    return this.http.get<joinPagamentos[]>(this.URL + '/join').pipe(
      tap(console.log)
    )
  }

  carregarPeloId(id_pagamento): Observable<ListaPagamentos[]> {
    return this.http.get<ListaPagamentos[]>(this.URL + '/pagamentos/' + id_pagamento)
    .pipe(
      tap(console.log),
      retryWhen(err => err.pipe(
        tap(value => console.log('Ainda nao pagou')),
        scan(retryCount => {
          if (retryCount > 25) throw err;
          else {
            retryCount++;
            return retryCount;
          }
        }, 0),
        delayWhen(() => timer(2000))
      ))
    //  retryWhen(errors =>
    //    errors.pipe(
          // log error message
     //     tap(value => console.log('Ainda nao pagou')),
          // restart in 5 seconds
          //delayWhen(value => timer(value * 1000))
    //    )
   //   )
    
      /* catchError(this.handleError) */
  
    )

  }

  //
  



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
