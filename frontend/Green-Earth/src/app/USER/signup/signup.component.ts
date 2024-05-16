import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  constructor(private authservice:AuthService, private router:Router){}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'phno':new FormControl('',  [Validators.required, Validators.pattern(/^\d{10}$/)]),
      'email':new FormControl('', [Validators.required, Validators.email] ),
      'password': new FormControl('',  [Validators.required, Validators.minLength(8), this.passwordValidator])
    })
}
passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const valid = hasNumber && hasUpper && hasLower;
  if (!valid) {
    // return what´s not valid
    return { 'passwordStrength': true };
  }
  return null;
}
onSubmit()
{
  if(this.signupForm.valid)
    {
      this.authservice.signupUser(this.signupForm.value.name, this.signupForm.value.phno, this.signupForm.value.email, this.signupForm.value.password).subscribe((res:any)=>
        {
            console.log(res);
            if(res.status == true)
                {
                    alert('Registration success');
                    this.router.navigate(['login']);

                }
                else
                {
                    alert('Error with registration')

                }
        })
    }
    else
    {
    this.signupForm.markAllAsTouched();
    }
  
}
}
