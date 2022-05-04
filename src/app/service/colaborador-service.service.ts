import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Colaborador } from '../model/colaborador';
import { Equipe } from '../model/equipe';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {
   equipe:Equipe[];

  public URL = 'https://app-lucaback-end.herokuapp.com'
  constructor(private http: HttpClient) { }

  deletaColaboradorNaEquipe(id): Observable<any> {
    return this.http.delete<any>(this.URL + '/equipe/' + id).pipe(
      map(
        retorno => retorno
      ),
      catchError(this.handleError)
    )
    
  }

  public upload(form) {
    console.log(form)
    return this.http.post<Colaborador>(this.URL + '/colaborador', form).pipe(
      tap(console.log)

    )

  }

  listColaborador() {
    return this.http.get<Colaborador>(this.URL + '/colaborador')
      .pipe(
        tap(console.log)

      )
  }

  somaValorPeloNomeServer(nome){
    console.log(nome)
    return this.http.get('http://localhost:3000/gruja/soma/'+ nome).pipe(
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
 
  insereColabradorNaEquipe(equipe:Equipe[]){
    
      return this.http.post(this.URL + '/equipe/', equipe) .pipe(
        tap(console.log)
  
      )
  
  
    }
  
  }

 