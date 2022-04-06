import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gruja } from '../model/gruja';
import { HttpHeaders } from '@angular/common/http';
import { catchError, filter, map, retry, take, tap, } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { guardedExpression } from '@angular/compiler/src/render3/util';
import { Colaborador } from '../model/colaborador';
import { identifierModuleUrl } from '@angular/compiler';
import { Filtro } from '../model/filtro';



@Injectable({
  providedIn: 'root'
})



export class GrujaService {

  grujas: Gruja[];
  colaboradores: Colaborador

  public URL = 'https://app-lucaback-end.herokuapp.com'
  constructor(private http: HttpClient) { }

  // Headers 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  }


  list() {
    return this.http.get<Gruja>(this.URL + '/gruja')
      .pipe(
        tap(console.log)
        
      )

  }

  listColaborador() {
    return this.http.get<Colaborador>(this.URL + '/colaborador')
      .pipe(
        tap(console.log)

      )


  }




  //delete
  deleteGruja(id): Observable<any> {
    console.log(id);
    return this.http.delete<any>(this.URL + '/gruja/' + id).pipe(
      map(
        retorno => retorno
      ),

      catchError(this.handleError)
    )

  }

  buscaPeloNomeServer(nome) {
    
    return this.http.get<Filtro>(this.URL + '/gruja/'+ nome).pipe(
      tap(console.log)
    )
  }

  create(gruja: Gruja[]) {
    return this.http.post(this.URL + '/gruja/', gruja) .pipe(
      tap(console.log)

    )


  }

  carregaPeloId(id_gruja) {
    return this.http.get<Gruja>(this.URL + '/gruja/v/'+ id_gruja).pipe(tap(console.log))
     }

     upDate(id_gruja): Observable<any> {
       return this.http.patch<any>(this.URL + '/gruja/',id_gruja).pipe(take(1))
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
