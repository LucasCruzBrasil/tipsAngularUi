import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, reduce, take, tap } from 'rxjs/operators';
import { Equipe } from '../model/equipe';
import { Valores } from '../model/valor';

@Injectable({
  providedIn: 'root'
})
export class ValoresServiceService {

  private ServiceBehaviorSubject = new BehaviorSubject<string>(`Dio - Egypt`);

  valores: Valores[];
  v: Valores
  equipe: Equipe[]

  public URL = 'https://app-lucaback-end.herokuapp.com'

  constructor(private http: HttpClient) { }



  // Headers 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  }

  eventoValor(valor: string) {
    this.ServiceBehaviorSubject.next(valor);
  }

  retornoValor() {
    return this.ServiceBehaviorSubject;
  }

  listaValores(): Observable<Valores[]> {
    return this.http.get<Valores[]>(this.URL + '/valores').pipe(
      tap(console.log)
    )
  }

  salvarValor(valores: Valores[]) {
    this.ServiceBehaviorSubject.next('')
    return this.http.post(this.URL + '/valores', valores).pipe(
      tap(console.log)
    )
}

  carregarPeloId(id_valor) {
    return this.http.get<Valores>(this.URL + '/valores/' + id_valor).pipe(tap(console.log))

  }
  carregarEquipePeloId(id_equipe) {
    return this.http.get<Equipe>(this.URL + '/equipe/' + id_equipe).pipe(tap(console.log))

  }

  upDateValor(valor): Observable<any> {
    return this.http.patch<any>(this.URL + '/valores/', valor).pipe(tap(console.log)
      , catchError(this.handleError)
    )
  }

  upDateValorEquipe(equipe): Observable<any> {
    return this.http.patch<any>(this.URL + '/equipe/', equipe).pipe(tap(console.log)
      , catchError(this.handleError)
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

  getEquipe() {
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
