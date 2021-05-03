import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from 'src/app/enums/user-role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // @Input() isLoggedIn?: boolean;
  // @Output() updateLoginState = new EventEmitter<string>();
  // private loginSource = new BehaviorSubject(false);
  private userRole = new BehaviorSubject(UserRole.GUEST);
  currentLoginState = this.userRole.asObservable();

  constructor(private router: Router) { }

  login(){
    //Api request goes here
    // this.updateLoginState.emit("new message");
    setTimeout(() => {
      localStorage.setItem('loginState', UserRole.LIBRARY_EMPLOYEE.toString());
      //Mock value, to be changed depending on the api response.
      this.userRole.next(UserRole.LIBRARY_EMPLOYEE);
    },1200);
  }
  logout(){
    //Timeouts are mock, just to simulate api request for now. To be changed soon.
    setTimeout(() => {
    this.router.navigate(['/'])
    localStorage.removeItem('loginState');
    this.userRole.next(UserRole.GUEST);
    },1300); 
  }
  checkStateOnRefresh(){
    //TODO: more cases 
    if(localStorage.getItem('loginState') == UserRole.REGISTERED.toString()){
      this.userRole.next(UserRole.REGISTERED);
    }
    switch(localStorage.getItem('loginState')){
      case UserRole.GUEST.toString():
        this.userRole.next(UserRole.GUEST)
        break;
      case UserRole.REGISTERED.toString():
        this.userRole.next(UserRole.REGISTERED)
        break;
      case UserRole.ADMIN.toString():
        this.userRole.next(UserRole.ADMIN)
        break;
      case UserRole.LIBRARY_EMPLOYEE.toString():
        this.userRole.next(UserRole.LIBRARY_EMPLOYEE)
        break;
      default:
        this.userRole.next(UserRole.GUEST)
        console.log('user role 0')
        break;
    }
  }
  isLoggedIn(): boolean{
    if(this.userRole.getValue() > 0){
      return true;
    }else{
      return false;
    }
  }
  isRegisteredUser(): boolean{
    if(this.userRole.getValue() == UserRole.REGISTERED){
      return true;
    }else{
      return false;
    }
  }
  isAdmin(): boolean{
    if(this.userRole.getValue() == UserRole.ADMIN){
      return true;
    }else{
      return false;
    }
  }
  isEmployee(): boolean{
    if(this.userRole.getValue() == UserRole.LIBRARY_EMPLOYEE){
      return true;
    }else{
      return false;
    }
  }
}
