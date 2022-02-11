import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Colaborador } from '../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {

  public URL = '/api'
  constructor(private http: HttpClient) { }

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

}
