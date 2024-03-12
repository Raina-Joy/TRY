import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';
@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrls: ['./emplogin.component.css']
})
export class EmploginComponent implements OnInit {
  loginEmpForm:FormGroup;
  constructor(private authservice:AuthService){}
ngOnInit(): void {
  this.loginEmpForm = new FormGroup({
    'name':new FormControl(''),
    'password': new FormControl('')
  })
}
onSubmit()
{
  this.authservice.loginEmp(this.loginEmpForm.value.name, this.loginEmpForm.value.password);

}


}
