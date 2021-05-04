import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Form, FormsModule, NgForm, NgModel } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner-service.service';
import { DialogService } from 'src/app/services/dialog-service.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit, OnDestroy {

  isLoggedIn?: number;
  subscription?: Subscription;

  constructor(
    private login: LoginService,
    private router: Router,
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    ) { }
 
  ngOnInit(): void {
    this.subscription = this.login.currentLoginState.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loginButtonHandler(form: NgForm) {
    console.log(form);
    this.spinnerService.displaySpinner();
    this.login.login(form.value.username, form.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.spinnerService.hideSpinner();
          this.router.navigate(['']);
          form.reset();
        },
        error => {
          console.log(error)
          this.spinnerService.hideSpinner();
          this.dialogService.displayDialog({message: error.error.detail,isSuccess: false,display: true});
          form.reset();
        }
      )
  }

}
