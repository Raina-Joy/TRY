import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';

import { Router } from '@angular/router';
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
  public tdoayStr:string;
  
  


  constructor(private http:HttpClient ,private authservice:AuthService, private dataservice:DataService, private route:Router){}

  ngOnInit(): void {
    
    //this.current_userid = this.authservice.getUserId();
    this.user = this.authservice.getUser();
    const day = new Date();

    // Format the current date to ISO format (YYYY-MM-DD)
    const todayISO = day.toISOString().split('T')[0];
    const today = new Date();

    // Set the timezone to Indian Standard Time (IST)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true
    };

    // Format the date and time into Indian Standard Time (IST) in 12-hour format
    const formattedISTDate = today.toLocaleString('en-IN', options);

    console.log("Indian Standard Time (IST) in 12-hour format:", formattedISTDate);




    this.tdoayStr = formattedISTDate;
    //console.log(this.tdoayStr)



    this.customuserid = this.authservice.getCustomuserid();
    // this.dataservice.getPickupsByCuid(this.customuserid).subscribe(res=>{
    //   console.log(res);
    // })
    console.log('user customid',this.customuserid);

    

    this.pickupform = new FormGroup({
      
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
      phno: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl(todayISO, [Validators.required]),
      time: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])


    })
}

pickUpSubmit()
{
  if (this.pickupform.valid) {
    // Proceed with form submission
    this.dataservice.addPickup(this.customuserid, this.user, this.pickupform.value.address, this.pickupform.value.pincode, this.pickupform.value.phno, this.pickupform.value.email,this.pickupform.value.date, this.pickupform.get('time')?.value, this.pickupform.get('category')?.value, this.status, this.tdoayStr).subscribe(res=>{
      console.log(res);
      if(res.status === 201)
        {
          alert('Successfully scheduled pick up');
          this.pickupform.reset();
          this.route.navigate(['puhistory']);
          
  
        }
    })
  } else {
    // Mark all form controls as touched to trigger display of validation messages
    this.pickupform.markAllAsTouched();
  }

  
  
  
}

}
