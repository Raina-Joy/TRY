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
  couponForm1:FormGroup;
  constructor(private http:HttpClient, private dataservice:DataService){}
  
  category: string[] = ['Gadgets','Food','Clothing','Beauty','Baby care','Grocery'];
  responsedata:any;
  selectedRow: any;
  selectedid:string;
  selectedcat:string;
  selectedbname:string;
  selectedtitle:string;
  selecteddesc:string;
  selectedcode:string;
  selectedoc:Date;
  selecteddoe:Date;

  




  show:boolean = false;

 

ngOnInit(): void {
  this.couponForm = new FormGroup({
    brandname:new FormControl(''), 
    title: new FormControl(''),
    desc : new FormControl(''),
    code : new FormControl(''),
    doc : new FormControl(''),
    doe : new FormControl(''),
    selectedOption:new FormControl('')

  })
  this.couponForm1 = new FormGroup({
    brandname1:new FormControl(''), 
    title1: new FormControl(''),
    desc1 : new FormControl(''),
    code1 : new FormControl(''),
    doc1 : new FormControl(''),
    doe1 : new FormControl(''),
    selectedOption1:new FormControl('')

  })
}
onRowClick(item: any): void {
  // Store the clicked row
  this.selectedRow = item;
  this.selectedid = item._id;
  this.selectedcat = item.category;
  this.selectedbname = item.brandname;
  this.selectedtitle = item.title;
  this.selecteddesc = item.desc;
  this.selectedcode = item.code;
  this.selectedoc = item.doc;
  this.selecteddoe = item.doe;




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
clearForm() {
  this.couponForm1.reset();
}
onUpdate()
{
  this. dataservice.updateCoupon(this.selectedid, this.couponForm1.value.selectedOption1, this.couponForm1.value.brandname1, this.couponForm1.value.title1, this.couponForm1.value.code1, this.couponForm1.value.desc1, this.couponForm1.value.doc1, this.couponForm1.value.doe1)
  this.showCoupons();
}


}
