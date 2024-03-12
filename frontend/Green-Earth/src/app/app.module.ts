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
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }