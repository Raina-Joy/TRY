import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/data-service';
import { AuthService } from 'src/app/shared/auth-service';

@Component({
  selector: 'app-punotification',
  templateUrl: './punotification.component.html',
  styleUrls: ['./punotification.component.css']
})
export class PunotificationComponent implements OnInit {
  public responseData: any;
  public current_userId:string;
  public userid : string;
  public pickupid : string;
  public category: string;
  public status: string;
  public state:string;

  public res:any;
  selectedRow: any;
  constructor(private http:HttpClient, private dataservice:DataService, private authservice:AuthService){}
  ngOnInit(): void {
    this.current_userId = this.authservice.getUserId();
    this.myReq();
    
    
  }
  myReq()
  {
  
    this.dataservice.emppickupData(this.current_userId).subscribe(data=>{
     
      console.log(data)

      this.responseData = data;

    
    })
    // this.http.get<any[]>('http://localhost:3000/emppureq').subscribe(data => {
    // });
  }
  onRowClick(item: any):void {
    // Store the clicked row
    this.selectedRow = item;
    this.userid = item.pickupData.cuid;
    this.pickupid = item.pickupData._id;
    this.category = item.pickupData.category;
    
    console.log("user id", this.userid)
    console.log("Category", this.category)


  }
  isRowDisabled(status: string): boolean {
    return status === 'Finished';
  }
  confirmStatus() {
    this.status = 'Confirmed';
    this.dataservice.sendStatus(this.status, this.pickupid).subscribe(
      response => {
        // Handle success response
        console.log("Status confirmed successfully");
        // Optionally, you can update responseData or perform any other action here
      },
      error => {
        // Handle error response
        console.error("Error confirming status:", error);
      }
    );
  }

  sendReward()
  {
    this.status = 'Finished';
    this.dataservice.sendStatus(this.status, this.pickupid).subscribe(
      response => {
        // Handle success response
        console.log("Status confirmed successfully");
        // Optionally, you can update responseData or perform any other action here
      },
      error => {
        // Handle error response
        console.error("Error finishing status:", error);
      }
    );
    this.dataservice.fetchCoupon(this.category).subscribe(data=>{
      //console.log(data)
      this.res = data;
      this.state='Not selected'
    this.dataservice.usersCoupondata(this.userid,this.res,this.state);
    })


    
  }
}

// confirmStatus() {
//   this.status = 'Confirmed';
//   this.dataservice.sendStatus(this.status, this.pickupid).subscribe(
//     response => {
//       // Handle success response
//       console.log("Status confirmed successfully");
//       // Optionally, you can update responseData or perform any other action here
//     },
//     error => {
//       // Handle error response
//       console.error("Error confirming status:", error);
//     }
//   );
// }

// sendReward() {
//   this.status = 'Finished';
//   this.dataservice.sendStatus(this.status, this.pickupid).subscribe(
//     response => {
//       // Handle success response
//       console.log("Status updated to Finished successfully");
//       // Fetch coupon and update user's coupon data
//       this.dataservice.fetchCoupon(this.category).subscribe(
//         data => {
//           // Handle success fetching coupon
//           console.log("Coupon fetched successfully");
//           this.res = data;
//           this.dataservice.usersCoupondata(this.userid, this.res).subscribe(
//             userData => {
//               // Handle success updating user's coupon data
//               console.log("User's coupon data updated successfully");
//             },
//             userError => {
//               // Handle error updating user's coupon data
//               console.error("Error updating user's coupon data:", userError);
//             }
//           );
//         },
//         couponError => {
//           // Handle error fetching coupon
//           console.error("Error fetching coupon:", couponError);
//         }
//       );
//     },
//     error => {
//       // Handle error updating status
//       console.error("Error updating status:", error);
//     }
//   );
// }

