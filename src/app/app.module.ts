import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageEmployeePanelComponent } from './page-employee-panel/page-employee-panel.component';
import { PageAdminPanelComponent } from './page-admin-panel/page-admin-panel.component';
import { PageUserPanelComponent } from './page-user-panel/page-user-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageLoginComponent,
    PageEmployeePanelComponent,
    PageAdminPanelComponent,
    PageUserPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
