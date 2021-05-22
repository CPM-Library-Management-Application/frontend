import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/enums/user-role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() test: any;
  userRole?: number;
  subscription?: Subscription;

  //enums cannot be use directly in an angular template since only variables exposed by a controller can
  ROLE_ADMIN: number = UserRole.ADMIN;
  ROLE_REGISTERED: number = UserRole.REGISTERED;
  ROLE_LIBRARY_EMPLOYEE: number = UserRole.LIBRARY_EMPLOYEE;

  constructor(private login: LoginService) { }
 
  userInfo$ = this.login.getUserInfo();

  ngOnInit(): void {
    this.subscription = this.login.currentLoginState.subscribe(userRole => this.userRole = userRole);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logoutButtonHandler(){
    this.login.logout()
      .subscribe(
        data => console.log('ok'),
        error => console.log('error')
      )
  }



}
