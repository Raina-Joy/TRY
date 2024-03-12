import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth-service';
@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  loginAdminForm:FormGroup;
  constructor(private authservice:AuthService){}
ngOnInit(): void {
  this.loginAdminForm = new FormGroup({
    'name':new FormControl(''),
    'password': new FormControl('')
  })
}
onSubmit()
{
  this.authservice.loginAdmin(this.loginAdminForm.value.name, this.loginAdminForm.value.password);

}


}
