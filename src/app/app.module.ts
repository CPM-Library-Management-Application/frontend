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
import { MainComponent } from './private/page-employee-panel/employee-panel/main/main.component';
import { PageBookLendComponent } from './private/page-employee-panel/employee-panel/book-lend/book-lend.component';
import { PageBookReturnComponent } from './private/page-employee-panel/employee-panel/book-return/book-return.component';
import { PageBookAddComponent } from './private/page-employee-panel/employee-panel/book-add/book-add.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { PageBookBorrowingTransactionDetailsComponent } from './private/page-book-borrowing-transaction-details/page-book-borrowing-transaction-details.component';


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
    LibraryMapComponent,
    MainComponent,
    PageBookLendComponent,
    PageBookReturnComponent,
    PageBookAddComponent,
    DialogBoxComponent,
    SpinnerComponent
    PageBookBorrowingTransactionDetailsComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ZXingScannerModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
