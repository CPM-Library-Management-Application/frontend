import { EditEmployeeComponent } from './private/page-admin-panel/employees/edit-employee.component';
import { NgModule } from '@angular/core';
import { BookDetailsComponent } from './common/book-details/book-details.component';
import { PageBookAddComponent } from './private/page-employee-panel/employee-panel/book-add/book-add.component';
import { PageBookLendComponent } from './private/page-employee-panel/employee-panel/book-lend/book-lend.component';
import { PageBookReturnComponent } from './private/page-employee-panel/employee-panel/book-return/book-return.component';
import { PageAdminPanelComponent } from './private/page-admin-panel/page-admin-panel.component';
import { PageEmployeePanelComponent } from './private/page-employee-panel/page-employee-panel.component';
import { PageUserPanelComponent } from './private/page-user-panel/page-user-panel.component';
import { AccessDeniedComponent } from './public/access-denied/access-denied.component';
import { PageHomeComponent } from './public/page-home/page-home.component';
import { PageLoginComponent } from './public/page-login/page-login.component';
import { PageRegisterComponent } from './public/page-register/page-register.component';
import { PageSearchResultsComponent } from './public/page-search-results/page-search-results.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { EmployeeAuthGuard } from './services/employee-auth-guard.service';
import { RegisteredUserAuthGuard } from './services/registered-user-auth-guard.service';
import { PageBookBorrowingTransactionDetailsComponent } from './private/page-book-borrowing-transaction-details/page-book-borrowing-transaction-details.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';


export const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: PageRegisterComponent},
  { path: 'search-results/:id', component: PageSearchResultsComponent},
  { path: 'access-denied', component: AccessDeniedComponent},
  { path: 'private/employee-panel', component: PageEmployeePanelComponent, canActivate: [AuthGuard, EmployeeAuthGuard ]},
  { path: 'private/employee-panel/book-add', component: PageBookAddComponent, canActivate: [AuthGuard, EmployeeAuthGuard]},
  { path: 'private/employee-panel/book-return', component: PageBookReturnComponent, canActivate: [AuthGuard, EmployeeAuthGuard]},
  { path: 'private/employee-panel/book-lend', component: PageBookLendComponent, canActivate: [AuthGuard, EmployeeAuthGuard]},
  { path: 'private/admin-panel', component: PageAdminPanelComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'private/user-panel', component: PageUserPanelComponent, canActivate: [AuthGuard, RegisteredUserAuthGuard ]},
  { path: 'private/user-panel/:transactionId', component: PageBookBorrowingTransactionDetailsComponent, canActivate: [AuthGuard, RegisteredUserAuthGuard ]},
  { path: 'private/admin-panel/listoflibraries', component: PageAdminPanelComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'private/admin-panel/editemployee/:id', component: EditEmployeeComponent,canActivate: [AuthGuard, AdminAuthGuard] },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
 
]  

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
