import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './USER/signup/signup.component';
import { LoginComponent } from './USER/login/login.component';
import { UserviewComponent } from './USER/userview/userview.component';
// import { RouteGuard } from './shared/route-guard';
import { EmpviewComponent } from './EMP/empview/empview.component';
import { EmpsignupComponent } from './EMP/empsignup/empsignup.component';
import { EmploginComponent } from './EMP/emplogin/emplogin.component';
import { LoginadminComponent } from './admin/loginadmin/loginadmin.component';
import { AdminviewComponent } from './admin/adminview/adminview.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},

  {path:'home', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserviewComponent},
  {path:'emp',component:EmpviewComponent},
  {path:'empsignup',component:EmpsignupComponent},
  {path:'emplogin',component:EmploginComponent},
  {path:'adminlogin',component:LoginadminComponent},
  {path:'adminview', component:AdminviewComponent},
  {path:'aboutus', component:AboutusComponent},
  {path:'contactus', component:ContactusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
