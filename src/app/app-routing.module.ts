import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

export const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: PageRegisterComponent},
  { path: 'search-results', component: PageSearchResultsComponent},
  { path: 'access-denied', component: AccessDeniedComponent},
  { path: 'private/employee-panel', component: PageEmployeePanelComponent, canActivate: [AuthGuard, EmployeeAuthGuard ]},
  { path: 'private/admin-panel', component: PageAdminPanelComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'private/user-panel', component: PageUserPanelComponent, canActivate: [AuthGuard, RegisteredUserAuthGuard ]}
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
