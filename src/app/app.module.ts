import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { PageHomeComponent } from './public/page-home/page-home.component';
import { PageLoginComponent } from './public/page-login/page-login.component';
import { PageEmployeePanelComponent } from './private/page-employee-panel/page-employee-panel.component';
import { PageAdminPanelComponent } from './private/page-admin-panel/page-admin-panel.component';
import { PageUserPanelComponent } from './private/page-user-panel/page-user-panel.component';
import { PageRegisterComponent } from './public/page-register/page-register.component';
import { FormsModule } from '@angular/forms';
import { ResultListComponent } from './common/result-list/result-list.component';
import { BookService } from './services/book.service';
import { AuthGuard } from './services/auth-guard.service';
import { AccessDeniedComponent } from './public/access-denied/access-denied.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RegisteredUserAuthGuard } from './services/registered-user-auth-guard.service';
import { EmployeeAuthGuard } from './services/employee-auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './common/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageLoginComponent,
    PageEmployeePanelComponent,
    PageAdminPanelComponent,
    PageUserPanelComponent,
    PageRegisterComponent,
    ResultListComponent,
    AccessDeniedComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PageHomeComponent },
      { path: 'login', component: PageLoginComponent },
      { path: 'register', component: PageRegisterComponent},
      { path: 'access-denied', component: AccessDeniedComponent},
      { path: 'private/employee-panel', component: PageEmployeePanelComponent, canActivate: [AuthGuard, EmployeeAuthGuard ]},
      { path: 'private/admin-panel', component: PageAdminPanelComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'private/user-panel', component: PageUserPanelComponent, canActivate: [AuthGuard, RegisteredUserAuthGuard ]}
    ]),
    NgbModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
