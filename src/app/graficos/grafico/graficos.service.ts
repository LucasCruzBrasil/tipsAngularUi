import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(private service: HttpClient) { }

  public URL = '/api'

  dayliForecast() {
    return this.service.get(this.URL + '/gruja').pipe(
      map(result => result)
    )

  }
}
