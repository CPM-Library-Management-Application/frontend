import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';
import { UserRole } from 'src/app/enums/user-role';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOGIN_URL = environment.API_URL + '/login';
  private LOGOUT_URL = environment.API_URL + '/logout/';
  private REGISTER_URL = environment.API_URL + '/register/';
  private USER_INFO_URL = environment.API_URL + '/user';
  // private USER_QRCODE_URL = environment.API_URL + '/media/user_qrcodes/';

  private jwtSubject: Subject<TokenDto>;
  public jwt$: Observable<TokenDto>;
  private userRoleSubject: BehaviorSubject<number>;
  public currentLoginState: Observable<number>;

  private MOCK_TEMPORARY_LOGIN_USER_RIGHTS = UserRole.ADMIN;

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
    
    return this.httpClient.post<any>(this.LOGIN_URL,
      { email: username, password: password},
      {observe: 'response', withCredentials: true})
      .pipe(map(response => {
        localStorage.setItem('user_data',JSON.stringify(response.body));
        if(response.body?.is_staff === true){
          localStorage.setItem('loginState', UserRole.LIBRARY_EMPLOYEE.toString());
          // **TEMPORARY**     THIS NEEDS TO BE CHANGED ONCE ENDPOINT IS READY
          var MOCK_TEMPORARY_EMPLOYEES_LIBRARY_ID = 1
          localStorage.setItem('employees_library_id',MOCK_TEMPORARY_EMPLOYEES_LIBRARY_ID.toString());
          // **END TEMPORARY** 
          this.userRoleSubject.next(UserRole.LIBRARY_EMPLOYEE)
        }else if(response.body.is_superuser === true){
          localStorage.setItem('loginState', UserRole.ADMIN.toString());
          this.userRoleSubject.next(UserRole.ADMIN);
        }else if(response.body.is_superuser === false && response.body.is_staff === false){
          localStorage.setItem('loginState', UserRole.REGISTERED.toString());
          this.userRoleSubject.next(UserRole.REGISTERED);
        }else{
          alert('User rights not fetched correctly. ')
        }
        console.log(response);
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
    localStorage.removeItem('loginState');
    this.userRoleSubject.next(UserRole.GUEST);
    return this.httpClient.post(this.LOGOUT_URL,{})
      .pipe(
        finalize(() => {
          console.log('logout completed');
          this.router.navigate(['/']);
        })
      );
  }
  register(username: string, password: string, email: string){
    return this.httpClient.post(this.REGISTER_URL,{
      username: username, 
      password: password,
      email: email
    })
    .pipe(
      finalize(() => {
        console.log('registered');
      })
    )
  }
  getUserInfo(){
    return this.httpClient.get<any>(this.USER_INFO_URL)
      .pipe(
        tap((x) => console.log(x)),
        finalize(() => {console.log('ok')})
      );
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