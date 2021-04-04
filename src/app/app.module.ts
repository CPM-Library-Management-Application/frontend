import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { PageHomeComponent } from './public/page-home/page-home.component';
import { PageLoginComponent } from './public/page-login/page-login.component';
import { PageEmployeePanelComponent } from './private/page-employee-panel/page-employee-panel.component';
import { PageAdminPanelComponent } from './private/page-admin-panel/page-admin-panel.component';
import { PageUserPanelComponent } from './private/page-user-panel/page-user-panel.component';
import { PageRegisterComponent } from './public/page-register/page-register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageLoginComponent,
    PageEmployeePanelComponent,
    PageAdminPanelComponent,
    PageUserPanelComponent,
    PageRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: PageHomeComponent },
      { path: 'login', component: PageLoginComponent },
      { path: 'register', component: PageRegisterComponent},
      { path: 'private/employee-panel', component: PageEmployeePanelComponent},
      { path: 'private/admin-panel', component: PageAdminPanelComponent},
      { path: 'private/user-panel', component: PageUserPanelComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
