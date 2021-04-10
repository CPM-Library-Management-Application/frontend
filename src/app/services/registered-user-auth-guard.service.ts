import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserAuthGuard {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(){
    if(this.loginService.isRegisteredUser()){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
