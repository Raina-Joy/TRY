import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './USER/signup/signup.component';
import { LoginComponent } from './USER/login/login.component';
import { NavComponent } from './nav/nav.component';
import { UserviewComponent } from './USER/userview/userview.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { EmpviewComponent } from './EMP/empview/empview.component';
import { EmploginComponent } from './EMP/emplogin/emplogin.component';
import { EmpsignupComponent } from './EMP/empsignup/empsignup.component';
import { AdminviewComponent } from './admin/adminview/adminview.component';
import { LoginadminComponent } from './admin/loginadmin/loginadmin.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SbNavComponent } from './sb-nav/sb-nav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { UsersComponent } from './admin/users/users.component';
import { CouponsComponent } from './admin/coupons/coupons.component';
import { RaisepickupComponent } from './USER/raisepickup/raisepickup.component';
import { PuhistoryComponent } from './USER/puhistory/puhistory.component';
import { RewardsComponent } from './USER/rewards/rewards.component';
import { PickupreqComponent } from './admin/pickupreq/pickupreq.component';
import { PunotificationComponent } from './EMP/punotification/punotification.component';
import { EmppickuphistoryComponent } from './EMP/emppickuphistory/emppickuphistory.component';
import { EarningsComponent } from './EMP/earnings/earnings.component';
import { ForgotpwdComponent } from './USER/forgotpwd/forgotpwd.component';
import { EmpfgtpwdComponent } from './EMP/empfgtpwd/empfgtpwd.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NavComponent,
    UserviewComponent,
    EmpviewComponent,
    EmploginComponent,
    EmpsignupComponent,
    AdminviewComponent,
    LoginadminComponent,
    AboutusComponent,
    ContactusComponent,
    SbNavComponent,
    DashboardComponent,
    EmployeesComponent,
    UsersComponent,
    CouponsComponent,
    RaisepickupComponent,
    PuhistoryComponent,
    RewardsComponent,
    PickupreqComponent,
    PunotificationComponent,
    EmppickuphistoryComponent,
    EarningsComponent,
    ForgotpwdComponent,
    EmpfgtpwdComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GooglePayButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
