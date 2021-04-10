import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthGuard {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(){
    if(this.loginService.isEmployee()){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
