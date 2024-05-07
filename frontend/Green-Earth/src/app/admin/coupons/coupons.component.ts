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
  responsedata:any;
  selectedRow: any;
  selectedid:string;
  show:boolean = false;

 

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
onRowClick(item: any): void {
  // Store the clicked row
  this.selectedRow = item;
  this.selectedid = item._id;
  console.log('Selected id:',this.selectedid)
  

  
  //console.log(this.selectedRow)
}
onSave()
{
  this.show = false;
  
    this. dataservice.addCoupon(this.couponForm.value.selectedOption, this.couponForm.value.brandname, this.couponForm.value.title, this.couponForm.value.code, this.couponForm.value.desc, this.couponForm.value.doc, this.couponForm.value.doe)
    this.showCoupons();
  }
showCoupons()
{
  this.show = true;
  this.dataservice.allCoupons().subscribe(data=>{
    console.log(data);
    this.responsedata = data;
  })
}
removeCoupon()
{

  this.dataservice.removeCoupon(this.selectedid).subscribe(data=>{
    console.log(data);
    this.showCoupons();
  })
}
editCoupon()
{

}

}
