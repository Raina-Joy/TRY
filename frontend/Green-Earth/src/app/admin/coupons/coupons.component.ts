import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  couponForm:FormGroup;
  constructor(private http:HttpClient, private dataservice:DataService){}
  
  category: string[] = ['Gadgets','Food','Clothing','Beauty','Baby care','Grocery'];

 

ngOnInit(): void {
  this.couponForm = new FormGroup({
    brandname:new FormControl(''), 
    title: new FormControl(''),
    desc : new FormControl(''),
    code : new FormControl(''),
    doc : new FormControl(''),
    doe : new FormControl(''),
    brandlogo:new FormControl(''),
    selectedOption:new FormControl('')

  })
}
onSave()
{
  
    this. dataservice.addCoupon(this.couponForm.value.selectedOption, this.couponForm.value.brandname, this.couponForm.value.title, this.couponForm.value.code, this.couponForm.value.desc, this.couponForm.value.doc, this.couponForm.value.doe)
  
  

}

}
