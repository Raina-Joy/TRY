import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empsignup',
  templateUrl: './empsignup.component.html',
  styleUrls: ['./empsignup.component.css']
})
export class EmpsignupComponent implements OnInit {

  signupempForm:FormGroup;
  constructor(private authservice:AuthService, private router:Router){}
  ngOnInit(): void {
    this.signupempForm = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'address':new FormControl('', [Validators.required]),
      'pincode':new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
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
  if(this.signupempForm.valid)
    {
      this.authservice.signupEmp(this.signupempForm.value.name,this.signupempForm.value.address,this.signupempForm.value.pincode,this.signupempForm.value.phno,this.signupempForm.value.email,this.signupempForm.value.password).subscribe((data:any)=>{
        if(data.status == true)
          {
            alert('Registration successful')
            this.router.navigate(['/emplogin']);
          }
      })
    }
    else
    {
      this.signupempForm.markAllAsTouched();
    }
  
}
}