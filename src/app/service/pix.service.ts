import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pix } from '../model/pix';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  pix: Pix;
  
  public URL = 'https://api-integracao-mercadopago.herokuapp.com'

  constructor(private http: HttpClient) { }

  QrServer(pix: Pix[]) {
    return this.http.post(this.URL + '/process_payment', pix).pipe(
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
