import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit, OnDestroy {

  isLoggedIn?: number;
  subscription?: Subscription;

  constructor(private login: LoginService, private router:Router) { }
 
  ngOnInit(): void {
    this.subscription = this.login.currentLoginState.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loginButtonHandler() {
    console.log('Login button clicked!');
    this.login.login();
  }

}
