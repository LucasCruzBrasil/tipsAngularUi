import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {

    /* if (this.authService.loggedIn()) {
      return true
    } else { 
      this.router.navigate(['']);
      return false
    } */

    if (!this.authService.isAuthenticate() || !this.authService.loggedIn()) {
       this.router.navigate(['']);
       return false;
     }
     console.log(this.authService.isAuthenticate())
     return true;
   } 


  


}
