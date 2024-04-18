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
  public status:string ='Pending';
  public customuserid:string;
  public user:string;


  constructor(private authservice:AuthService, private dataservice:DataService){}

  ngOnInit(): void {
    
    //this.current_userid = this.authservice.getUserId();
    this.user = this.authservice.getUser();

    this.customuserid = this.authservice.getCustomuserid();
    // this.dataservice.getPickupsByCuid(this.customuserid).subscribe(res=>{
    //   console.log(res);
    // })
    console.log('user customid',this.customuserid);

    

    this.pickupform = new FormGroup({
      
      address:new FormControl(''),
      pincode:new FormControl(''),
      phno:new FormControl(''),
      email:new FormControl(''),
      date:new FormControl(''),
      time:new FormControl(''),
      category:new FormControl('')


    })
}

pickUpSubmit()
{
  
  
  this.dataservice.addPickup(this.customuserid, this.user, this.pickupform.value.address, this.pickupform.value.pincode, this.pickupform.value.phno, this.pickupform.value.email,this.pickupform.value.date, this.pickupform.get('time')?.value, this.pickupform.get('category')?.value, this.status).subscribe(res=>{
    console.log(res);
    if(res.status === 201)
      {
        alert('Successfully scheduled pick up');
      }
  })
  
}
}
