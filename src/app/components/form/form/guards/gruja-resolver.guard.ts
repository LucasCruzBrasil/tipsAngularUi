import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Gruja } from 'src/app/model/gruja';
import { GrujaService } from 'src/app/service/gruja.service';

@Injectable({
  providedIn: 'root'
})
export class GrujaResolverGuard implements Resolve<Gruja> {
  constructor(private service: GrujaService){}
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Gruja> {

      if(route.params && route.params['id_gruja']) {
       return this.service.carregaPeloId(route.params['id_gruja'])
    }

    return of( {
     id_gruja:null,
      nome:null,
      id_colaborador: null,
      valor:null,
      data:null
    });
   
  }

}
  

