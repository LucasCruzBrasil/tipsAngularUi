import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(private service: HttpClient) { }

  public URL = 'https://app-lucaback-end.herokuapp.com'

  dayliForecast() {
    return this.service.get(this.URL + '/valores').pipe(
      map(result => result)
    )

  }
}
