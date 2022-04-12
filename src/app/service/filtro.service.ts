import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Filtro } from '../model/filtro';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private httpClient: HttpClient) { }
  private readonly URL = 'https://app-lucaback-end.herokuapp.com'
  buscarId(){
     return this.httpClient.get<Filtro>(this.URL + '/:id_colaborador').
     pipe(
       tap(console.log)
     )
  }
}
