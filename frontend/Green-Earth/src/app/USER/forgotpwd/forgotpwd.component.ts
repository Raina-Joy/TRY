import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth-service';
import { EmailService } from 'src/app/shared/emailservice';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data-service';
@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {
  loginForm:FormGroup;
  updateForm:FormGroup;

  
  constructor(private authservice:AuthService, private emailService:EmailService, private route:Router, private dataservice:DataService){}
  generatedOTP:string='';
  userid:string;
  show:boolean = false;
  showf2:boolean = false;
  showf1:boolean = true;


ngOnInit(): void {
  this.loginForm = new FormGroup({
    'phno':new FormControl(''),
    'email':new FormControl(''),
    'otp': new FormControl('')
    
  })
  this.updateForm = new FormGroup({
    'pwd1':new FormControl(''),
    'pwd2':new FormControl(''),
    
  })

}
generateOTP() {
  // Generate a random 4-digit OTP
  this.generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(this.generatedOTP);
}
sendOTP()
{
    this.show=true;
    const to = this.loginForm.value.email;
    const subject = 'OTP verification';
    const text = 'Your OTP for verication is:'+ this.generatedOTP;

    this.emailService.sendEmail(to, subject, text).subscribe(response => {
      console.log('Email sent successfully:', response);
    }, error => {
      console.error('Error sending email:', error);
    });

  
  

}
VerifyOTP()
{
 

  console.log(this.loginForm.value.otp, this.generatedOTP)
  if(this.generatedOTP == this.loginForm.value.otp)
    {
      alert("OTP verification success");
      this.showf1=false;
      this.showf2=true;
      this.dataservice.fetchpwd(this.loginForm.value.phno).subscribe((data:any)=>{
        this.userid = data.findresult;
      })    
    }
    else
    {
      alert("OTP verification Failed");
      this.showf1=true;
      this.showf2=false;
      this.loginForm.reset();

    }

}
update()
{
console.log(this.userid,this.updateForm.value.pwd2)
  this.dataservice.updatePassword(this.userid,this.updateForm.value.pwd2).subscribe((data:any)=>{
    console.log(data);
    if(data.status == true)
      {
        this.route.navigate(['/login']);
      }
  });

}



}
