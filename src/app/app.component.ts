import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'current-directory';
  testValue = "this is a test";
  isLoggedIn?: number;
  subscription?: Subscription;
  
  constructor(private login: LoginService) {}


  ngOnInit(): void {
    this.subscription = this.login.currentLoginState.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.login.checkStateOnRefresh();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
