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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { UsersComponent } from './admin/users/users.component';
import { CouponsComponent } from './admin/coupons/coupons.component';
import { RaisepickupComponent } from './USER/raisepickup/raisepickup.component';
import { PuhistoryComponent } from './USER/puhistory/puhistory.component';
import { RewardsComponent } from './USER/rewards/rewards.component';
import { PickupreqComponent } from './admin/pickupreq/pickupreq.component';
import { PunotificationComponent } from './EMP/punotification/punotification.component';
const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},

  {path:'home', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'user', component:UserviewComponent,
  
  children:
    [
      {path:'pickup',component:RaisepickupComponent},
      {path:'puhistory',component:PuhistoryComponent},
      {path:'rewards',component:RewardsComponent}


      
  ]},
  {path:'emp',component:EmpviewComponent,
  children:[
    {path:'pickupnot',component:PunotificationComponent}
      
  ]},
  {path:'empsignup',component:EmpsignupComponent},
  {path:'emplogin',component:EmploginComponent},
  {path:'adminlogin',component:LoginadminComponent},
  {
    path:'adminview', 
    component:AdminviewComponent,
    children:
    [
      {path:'dashboard',component:DashboardComponent}, 
      {path:'ppreq',component:PickupreqComponent}, 

      {path:'employees',component:EmployeesComponent},
      {path:'users',component:UsersComponent},
      {path:'coupons',component:CouponsComponent}, 



  ]
  },
  {path:'aboutus', component:AboutusComponent},
  {path:'contactus', component:ContactusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
