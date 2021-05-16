import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog-service.service';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner-service.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerButtonHandler(form: NgForm){
    console.log('register button handler');
    console.log(form);
    if(form.value.password === form.value.passwordconfirm){
      this.spinnerService.displaySpinner();
      this.loginService.register(form.value.username, form.value.password, form.value.email)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.spinnerService.hideSpinner();
            form.reset();
            this.dialogService.displayDialog({message: 'Registered successfully. You can now log in.', isSuccess: true, display:true});
          },
          error => {
            form.reset();
            this.dialogService.displayDialog({message: error.message, display: true, isSuccess: false});
          }
        )
    }else{
      this.dialogService.displayDialog({message: 'Passwords do not match!', isSuccess: false, display: true});
    }
  }

}
