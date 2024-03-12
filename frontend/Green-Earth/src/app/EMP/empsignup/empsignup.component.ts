import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-empsignup',
  templateUrl: './empsignup.component.html',
  styleUrls: ['./empsignup.component.css']
})
export class EmpsignupComponent implements OnInit {

  signupempForm:FormGroup;
  constructor(private authservice:AuthService){}
  ngOnInit(): void {
    this.signupempForm = new FormGroup({
      'name':new FormControl(''),
      // 'address':new FormControl(''),
      // 'phno':new FormControl(''),
      // 'email':new FormControl(''),
      'password': new FormControl('')
    })
}
onSubmit()
{
  this.authservice.signupEmp(this.signupempForm.value.name,this.signupempForm.value.password)
  
}
}