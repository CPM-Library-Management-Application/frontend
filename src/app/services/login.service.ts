import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserRole } from 'src/app/enums/user-role';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOGIN_URL = environment.API_URL + '/account/token/';

  private jwtSubject: Subject<TokenDto>;
  public jwt$: Observable<TokenDto>;
  private userRoleSubject: BehaviorSubject<number>;
  public currentLoginState: Observable<number>;


  constructor(
    private router: Router,
    private httpClient: HttpClient
      ) {
        this.userRoleSubject = new BehaviorSubject(UserRole.GUEST);
        this.currentLoginState = this.userRoleSubject.asObservable();
        this.jwtSubject = new Subject();
        this.jwt$ = this.jwtSubject.asObservable();
       }

  // jwt$ =  this.httpClient.post<TokenDto>(this.LOGIN_URL, { username:"admin",password:"admin"});

  login(username: string, password: string){
    
    return this.httpClient.post<TokenDto>(this.LOGIN_URL,{ username: username, password: password})
      .pipe(map(token => {
        localStorage.setItem('loginState', UserRole.LIBRARY_EMPLOYEE.toString());
        this.userRoleSubject.next(UserRole.LIBRARY_EMPLOYEE);
        console.log(token);
      }))
    
    
    // === OLD VERSION, DO NOT DELETE YET === 
    //Api request goes here
    // this.updateLoginState.emit("new message");
    // this.jwt$
    //   .pipe(tap(token => {
    //     console.log(token);
    //     console.log(atob((token.access).split('.')[1]));
    //   }), take(1))
    //   .subscribe();

    // setTimeout(() => {

    //   localStorage.setItem('loginState', UserRole.LIBRARY_EMPLOYEE.toString());
    //   //Mock value, to be changed depending on the api response.
    //   this.userRoleSubject.next(UserRole.LIBRARY_EMPLOYEE);
    // },1200);
  }
  logout(){
    //Timeouts are mock, just to simulate api request for now. To be changed soon.
    setTimeout(() => {
    this.router.navigate(['/'])
    localStorage.removeItem('loginState');
    this.userRoleSubject.next(UserRole.GUEST);
    },1300); 
  }
  checkStateOnRefresh(){
    //TODO: more cases 
    if(localStorage.getItem('loginState') == UserRole.REGISTERED.toString()){
      this.userRoleSubject.next(UserRole.REGISTERED);
    }
    switch(localStorage.getItem('loginState')){
      case UserRole.GUEST.toString():
        this.userRoleSubject.next(UserRole.GUEST)
        break;
      case UserRole.REGISTERED.toString():
        this.userRoleSubject.next(UserRole.REGISTERED)
        break;
      case UserRole.ADMIN.toString():
        this.userRoleSubject.next(UserRole.ADMIN)
        break;
      case UserRole.LIBRARY_EMPLOYEE.toString():
        this.userRoleSubject.next(UserRole.LIBRARY_EMPLOYEE)
        break;
      default:
        this.userRoleSubject.next(UserRole.GUEST)
        console.log('user role 0')
        break;
    }
  }
  isLoggedIn(): boolean{
    if(this.userRoleSubject.getValue() > 0){
      return true;
    }else{
      return false;
    }
  }
  isRegisteredUser(): boolean{
    if(this.userRoleSubject.getValue() == UserRole.REGISTERED){
      return true;
    }else{
      return false;
    }
  }
  isAdmin(): boolean{
    if(this.userRoleSubject.getValue() == UserRole.ADMIN){
      return true;
    }else{
      return false;
    }
  }
  isEmployee(): boolean{
    if(this.userRoleSubject.getValue() == UserRole.LIBRARY_EMPLOYEE){
      return true;
    }else{
      return false;
    }
  }
}


interface TokenDto {
    access: string;
    refresh: string;
}