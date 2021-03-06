import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(){
    if(this.loginService.isAdmin()){
      return true;
    }
    this.router.navigate(['/access-denied']);
    return false;
  }
}
