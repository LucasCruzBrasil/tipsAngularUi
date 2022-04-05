import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, reduce, take, tap } from 'rxjs/operators';
import { Equipe } from '../model/equipe';
import { Iequipe } from '../model/Iequipe';
import { Valores } from '../model/valor';

@Injectable({
  providedIn: 'root'
})
export class ValoresServiceService {
  valores: Valores[];
  v:Valores

  public URL = 'https://app-lucaback-end.herokuapp.com'

  constructor(private http: HttpClient) { }
  // Headers 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  }

  listaValores() {
    return this.http.get<Valores>('https://app-lucaback-end.herokuapp.com/valores').pipe(tap(console.log))

    
  }

  salvarValor(valores: Valores[]) {
    return this.http.post(this.URL + '/valores', valores).pipe(
      tap(console.log)
    )

  }

  carregarPeloId(id_valor) {
    return this.http.get<Valores>(this.URL + '/valores/' + id_valor).pipe(tap(console.log))

  }

  upDateValor(valor): Observable<any> {
    return this.http.patch<any>(this.URL + '/valores/', valor).pipe(tap(console.log)
    ,catchError(this.handleError)
    )
  }

  //delete
  deleteValor(id): Observable<any> {
    console.log(id);
    return this.http.delete<any>(this.URL + '/valores/' + id).pipe(
      map(
        retorno => retorno
      ),

      catchError(this.handleError)
    )

  }

  getEquipe(){
   return this.http.get<Equipe>(this.URL + '/equipe').pipe(tap(console.log))
  }

  listaValorCartaoServer() {
    return this.http.get<Valores[]>(this.URL + '/valores').pipe(
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
