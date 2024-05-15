import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  
  constructor(private authservice:AuthService){}
ngOnInit(): void {
  this.loginForm = new FormGroup({
    'phno':new FormControl(''),
    'password': new FormControl('')
    
  })
}
onSubmit()
{
  
 this.authservice.loginUser(this.loginForm.value.phno, this.loginForm.value.password);


}


}
