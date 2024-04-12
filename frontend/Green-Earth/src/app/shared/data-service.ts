import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PickupDataModal } from "./data-pickupmodel";
import { Observable } from "rxjs";
import { EmpPickupDataModal } from "./emppudatamodel";
import { CouponDataModal } from "./coupondatamodel";
import { usersCoupondata } from "./userid_with_coupon";
@Injectable({providedIn:"root"})
export class DataService
{
    empid: String;
    orderdata:any;
    rewards:any;

    constructor(private http:HttpClient, private router:Router ){}
    addPickup( userid:string, name:string, address:string,pincode:number,phno:number, email:string,date:string,time:string, rwcat:string)
    {
        const pickupdata: PickupDataModal = {userid:userid, name:name, address:address,pincode:pincode,phno:phno, email:email,date:date,time:time, rwcat:rwcat};
        console.log(pickupdata);
        this.http.post('http://localhost:3000/addpickup',pickupdata).subscribe(res=>
        {
            alert("Successfully Scheduled");
            this.router.navigate(['puhistory']);

        })      
    }
    
    
    findAllpickupreq(): Observable<any[]> 
    {
        return this.http.get<any[]>('http://localhost:3000/allpickupreq');
    }
   
   
    fetchData(targetPin: string): Observable<any> 
    {
        const apiUrl = 'http://localhost:3000/match';
        const urlWithParams = `${apiUrl}?data=${targetPin}`;
        return this.http.get(urlWithParams);
     }
     sendData(empid:string, empname:string,pickupdata:object)
     {
        const emppudata: EmpPickupDataModal = {empId:empid, empName:empname, pickupData:pickupdata};
        console.log(emppudata);
        this.http.post('http://localhost:3000/emppudata',emppudata).subscribe(res=>
        {
            console.log(res);

        })      
     }

     emppickupData(empid:string)
     {
        const apiUrl = 'http://localhost:3000/emppureq';
        const urlWithParams = `${apiUrl}?data=${empid}`;
        return this.http.get(urlWithParams);
     }

     addCoupon(category:string, brandname:string, title:string,code:string,desc:string, doc:Date, doe:Date)
     {
        const coupondata: CouponDataModal = {category:category, brandname:brandname, title:title, desc:desc, code:code, doc:doc, doe:doe}
        console.log(coupondata);
        this.http.post('http://localhost:3000/addcoupon',coupondata).subscribe(res=>{
            console.log(res);
        })

     }

     fetchCoupon(category:string)
     {
        const apiUrl = 'http://localhost:3000/couponfind';
        const urlWithParams = `${apiUrl}?data=${category}`;
       return this.http.get(urlWithParams);
        
     }
     usersCoupondata(userid:string, data:object)
     {
        console.log(data);
        const userscoupondata: usersCoupondata = {userid:userid, receivedCoupon:data}

        this.http.post('http://localhost:3000/uscudata',userscoupondata).subscribe(res=>{
            console.log(res)
        })
    
     
     }


     fetchUserCoupon(userid:string)
     {
        const apiUrl = 'http://localhost:3000/findusercun';
        const urlWithParams = `${apiUrl}?data=${userid}`;
       return this.http.get(urlWithParams);
        
     }
    }
