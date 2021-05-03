import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { DialogService } from './services/dialog-service.service';

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
  dialogState$ = this.dialogService.currentDialogStateAction$;
  
  constructor(private login: LoginService,
              private dialogService: DialogService
              ) {}


  ngOnInit(): void {
    this.subscription = this.login.currentLoginState.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.login.checkStateOnRefresh();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
