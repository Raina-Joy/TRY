import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PickupDataModal } from "./data-pickupmodel";
import { RouteModal } from "./route-model";
import { catchError, switchMap } from 'rxjs/operators'; 
import { EmpPickupDataModal } from "./emppudatamodel";
import { CouponDataModal } from "./coupondatamodel";
import { usersCoupondata } from "./userid_with_coupon";
import { Observable, throwError } from "rxjs";
@Injectable({providedIn:"root"})
export class DataService
{
    empid: String;
    status: String;

    orderdata:any;
    rewards:any;
    private apiUrl = 'http://localhost:3000';

    constructor(private http:HttpClient, private router:Router ){}
    addPickup(cuid: string, name: string, address: string, pincode: number, phno: number, email: string, date: string, time: string, category: string, status: string, notifdate:string): Observable<any> {
      // Check if a pickup exists with the provided cuid
      return this.getPickupsByCuid(cuid).pipe(
        switchMap((pickups: any[]) => {
          if (pickups.length > 0) {
            //console.log("test1")
            // Check if any pickup has a status other than 'Finished'
            const unfinishedPickup = pickups.find(pickup => pickup.status !== 'Finished');
            if (unfinishedPickup) {
              // User already has an unfinished pickup
           // console.log("test2")

              return throwError('You already have an unfinished pickup.');
            } else {
              
              // Proceed with adding the new pickup
            //console.log("test3")

              const pickupData: PickupDataModal = {cuid:cuid, name:name, address:address,pincode:pincode,phno:phno, email:email,date:date,time:time, category:category, status:status, notifdate:notifdate};
              return this.http.post('http://localhost:3000/addpickup',pickupData);

            }
          } else {
           // console.log("test4")

            // No pickup exists for the provided cuid, add the new pickup
            const pickupData: PickupDataModal = {cuid:cuid, name:name, address:address,pincode:pincode,phno:phno, email:email,date:date,time:time, category:category, status:status, notifdate:notifdate};
            console.log(pickupData);
            return this.http.post('http://localhost:3000/addpickup',pickupData)
          }
        }),
        catchError(error => {
          // Handle any errors here, for example, if the server returns an error response
          console.error('Error adding pickup:', error);
          alert(error);
          return throwError('Failed to add pickup. Please try again later.');
        })
      );
    }
  
    public getPickupsByCuid(cuid: string): Observable<any[]> {
      console.log('test statrt');
      const apiUrl = 'http://localhost:3000/findpickupbyid';
        const urlWithParams = `${apiUrl}?data=${cuid}`;
        return this.http.get<any[]>(urlWithParams);
      // const url = `${this.apiUrl}/findpickupbyid?data=${cuid}`; // Send cuid as a query parameter named data
      // return this.http.get<any[]>(url);
    }

    getSortedEmpbydate(cuid: string): Observable<any> {
      const apiUrl = 'http://localhost:3000/sortempbydate';
      const urlWithParams = `${apiUrl}?data=${cuid}`;
      return this.http.get<any>(urlWithParams);
    }
    
 
    
    findAllpickupreq(): Observable<any[]> 
    {
        return this.http.get<any[]>('http://localhost:3000/allpickupreq');
    }
    findAllusers(): Observable<any[]> 
    {
        return this.http.get<any[]>('http://localhost:3000/allu');
    }
   
   
    fetchData(targetPin: string): Observable<any> 
    {
        const apiUrl = 'http://localhost:3000/match';
        const urlWithParams = `${apiUrl}?data=${targetPin}`;
        return this.http.get(urlWithParams);
     }
     sendData(empid:string, empname:string,pickupdata:object, assigndate:string, status:string)
     {
        const emppudata: EmpPickupDataModal = {empId:empid, empName:empname, pickupData:pickupdata, assigndate:assigndate, status:status};
        console.log(emppudata);
        this.http.post('http://localhost:3000/emppudata',emppudata).subscribe(res=>
        {
            console.log(res);

        })      
     }
     sendStatus(status:string, pickupid:string)
     {
     console.log("id and stat", status, pickupid)

        const apiUrl = 'http://localhost:3000/sendstatus';
        const urlWithParams = `${apiUrl}?status=${status}&pickupid=${pickupid}`;
        return this.http.get(urlWithParams);
        
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
     usersCoupondata(userid:string, data:object, state:string)
     {
        console.log(data);
        const userscoupondata: usersCoupondata = {userid:userid, receivedCoupon:data, state:state}

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

    updateCouponState(couponState:string,userid:string)
    {
      const apiUrl = 'http://localhost:3000/sendcouponstatus';
        const urlWithParams = `${apiUrl}?state=${couponState}&userid=${userid}`;
        return this.http.get(urlWithParams);

    }
    findEmpbyIdandStatus(empid:string)
    {
      const apiUrl = 'http://localhost:3000/findempbyid';
        const urlWithParams = `${apiUrl}?data=${empid}`;
        return this.http.get(urlWithParams);
    }
    addRoute(empid:string, empname:string, emppin:number, collectionpins: {
          pin1:number,
          pin2:number,
          pin3:number} )
    {
      const routedata: RouteModal = {empid:empid, empname:empname, emppin:emppin, collectionpins: {
        pin1: collectionpins.pin1,
        pin2: collectionpins.pin2,
        pin3: collectionpins.pin3
      }};
      console.log(routedata);
      return this.http.post('http://localhost:3000/addroute',routedata)     
    }
    removeEmp(empid:string)
    {
      const apiUrl = 'http://localhost:3000/removeemp';
      const urlWithParams = `${apiUrl}?data=${empid}`;
      return this.http.delete(urlWithParams);
    }
    removeRoute(empid:string)
    {
      const apiUrl = 'http://localhost:3000/removeroute';
      const urlWithParams = `${apiUrl}?data=${empid}`;
      return this.http.delete(urlWithParams);
    }
    updateRoute(empid:string,collectionpins: {
      pin1:number,
      pin2:number,
      pin3:number})
    {
     //console.log('From service:',empid,collectionpins.pin1,collectionpins.pin2,collectionpins.pin3)
      const apiUrl = 'http://localhost:3000/updateroute';
      const urlWithParams = `${apiUrl}?empid=${empid}`;

      return this.http.put(urlWithParams, { collectionpins });
     

    }
    allCoupons()
    {
      return this.http.get('http://localhost:3000/allcoupon');
    }
    removeCoupon(couponid:string)
    {
      const apiUrl = 'http://localhost:3000/removecoupon';
      const urlWithParams = `${apiUrl}?data=${couponid}`;
      return this.http.delete(urlWithParams);
    }

    updateCoupon(couponid:string, category:string, brandname:string, title:string,code:string,desc:string, doc:Date, doe:Date)
     {
        const coupondata: CouponDataModal = {category:category, brandname:brandname, title:title, desc:desc, code:code, doc:doc, doe:doe}
        console.log('coupondata',coupondata, 'id', couponid);
        const apiUrl = 'http://localhost:3000/updatecoupon';
        const urlWithParams = `${apiUrl}?couponid=${couponid}`;
        this.http.put(urlWithParams, coupondata).subscribe(res=>{
            console.log(res);
        })

     }
     genempSal(empid: string, from: Date, to: Date) {
      console.log('from service', empid, from, to);
      const apiUrl = 'http://localhost:3000/findsal';
      const urlWithParams = `${apiUrl}?data=${empid}&from=${from}&to=${to}`;
      return this.http.get(urlWithParams);
    }
   
    payment(amount: number, token:string) {
      console.log('Amount and token',amount,token);
      return this.http.post('http://localhost:3000/charge', {amount, token}).subscribe(res=>{
        console.log(res);
      });
    
    }
    fetchpwd(phno:number)
    {
      const apiUrl = 'http://localhost:3000/findpwd';
      const urlWithParams = `${apiUrl}?data=${phno}`;
      return this.http.get(urlWithParams);


    }
    updatePassword(userId: string, newPassword: string): Observable<any> {
      // const apiUrl = 'http://localhost:3000';
      // const url = `${apiUrl}/password-reset`; // Adjust the route as needed
      const body = { userId, newPassword };
  
      return this.http.post('http://localhost:3000/update-password', body);
    }
    fetchemppwd(name:string)
    {
      const apiUrl = 'http://localhost:3000/findemppwd';
      const urlWithParams = `${apiUrl}?data=${name}`;
      return this.http.get(urlWithParams);


    }
    updateempPassword(userId: string, newPassword: string): Observable<any> {
      // const apiUrl = 'http://localhost:3000';
      // const url = `${apiUrl}/password-reset`; // Adjust the route as needed
      const body = { userId, newPassword };
  
      return this.http.post('http://localhost:3000/update-emppassword', body);
    }

  
    
    }
