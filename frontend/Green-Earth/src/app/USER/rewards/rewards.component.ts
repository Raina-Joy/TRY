import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
})
export class RewardsComponent implements OnInit {
  public current_userId: string;
  public buttonText: string = "Choose";

  userCouponData: any; // Assuming this is where you store the received data
  selectedCoupon: any = null; // Property to store the selected coupon
  couponVisibility: boolean[] = []; // Array to store the visibility state of each coupon
  showCouponCode: boolean = false; // Property to track visibility of coupon code

  constructor(private http: HttpClient, private authservice: AuthService, private dataservice: DataService) {}

  ngOnInit(): void {
    this.current_userId = this.authservice.getCustomuserid();
    //this.showRewards(); // Load rewards when component initializes
  }

  showRewards() {
    
      this.dataservice.fetchUserCoupon(this.current_userId).subscribe((data: any) => {
        console.log(data);
        this.userCouponData = data;
        
      });
    
  }

//   chooseCoupon(coupon: any, index: number) {
//     this.selectedCoupon = coupon; // Set the selected coupon
//     this.showCouponCode = true; // Show coupon code
  
//     // Update couponVisibility array to hide all coupons except the selected one
//     this.couponVisibility = this.couponVisibility.map((visibility, i) => i === index);
  
//     // Check if the current date is past the end date
//     const currentDate = new Date();
//     const endDate = new Date(coupon.doe); // Assuming doe is the end date property
  
//     if (currentDate > endDate) {
//       // If past the end date, disable the coupon
//       this.selectedCoupon.disabled = true;
//     }
  
//     // Save selected coupon to Local Storage with user ID in the key
//     localStorage.setItem(`selectedCoupon_${this.current_userId}`, JSON.stringify(this.selectedCoupon));
//     this.buttonText = this.selectedCoupon ? "Redeem" : "Choose";
//   }
  
 }
