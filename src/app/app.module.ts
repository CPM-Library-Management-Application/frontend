import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { AccessDeniedComponent } from './public/access-denied/access-denied.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './common/dropdown/dropdown.component';
import { PageSearchResultsComponent } from './public/page-search-results/page-search-results.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './common/book-details/book-details.component';
import { LibraryMapComponent } from './common/library-map/library-map.component';

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
    DropdownComponent,
    PageSearchResultsComponent,
    BookDetailsComponent,
    LibraryMapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
