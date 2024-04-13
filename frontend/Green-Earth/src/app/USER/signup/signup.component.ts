import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  constructor(private authservice:AuthService){}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name':new FormControl(''),
      'phno':new FormControl(''),
      'email':new FormControl(''),
      'password': new FormControl('')
    })
}
onSubmit()
{
  this.authservice.signupUser(this.signupForm.value.name, this.signupForm.value.phno, this.signupForm.value.email, this.signupForm.value.password)
  
}
}
