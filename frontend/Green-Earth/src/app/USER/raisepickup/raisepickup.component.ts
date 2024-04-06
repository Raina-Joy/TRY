import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';
@Component({
  selector: 'app-raisepickup',
  templateUrl: './raisepickup.component.html',
  styleUrls: ['./raisepickup.component.css']
})
export class RaisepickupComponent implements OnInit {
  pickupform:FormGroup;
  public current_userid:string;
  constructor(private authservice:AuthService, private dataservice:DataService){}

  ngOnInit(): void {
    
    this.current_userid = this.authservice.getUserId();

    this.pickupform = new FormGroup({
      
      name:new FormControl(''),
      address:new FormControl(''),
      pincode:new FormControl(''),
      phno:new FormControl(''),
      email:new FormControl(''),
      date:new FormControl(''),
      time:new FormControl(''),
      rwcat:new FormControl('')


    })
}

pickUpSubmit()
{
  
  this.dataservice.addPickup(this.current_userid, this.pickupform.value.name, this.pickupform.value.address, this.pickupform.value.pincode, this.pickupform.value.phno, this.pickupform.value.email,this.pickupform.value.date, this.pickupform.get('time')?.value, this.pickupform.get('rwcat')?.value)
  
}
}
