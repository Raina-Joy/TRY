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
  selectedCoupons: any[] = []; // Property to store the selected coupon
  couponVisibility: boolean[] = []; // Array to store the visibility state of each coupon
  showCouponCode: boolean = false; // Property to track visibility of coupon code
  showCode: boolean = false; // Property to track visibility of coupon code
  couponState: string; // Property to track visibility of coupon code
  showReward:boolean;


  constructor(private http: HttpClient, private authservice: AuthService, private dataservice: DataService) {}

  ngOnInit(): void {
    this.current_userId = this.authservice.getCustomuserid();
    //this.showRewards(); // Load rewards when component initializes
    //this.showRewards(); // Load rewards when component initializes
    this.dataservice.fetchUserCoupon(this.current_userId).subscribe((data:any)=>{
      this.couponState=data.state;
        console.log(data.state);
        if(this.couponState ==='Not selected')
          {
            this.showReward = true;
          }
          else
          {
            this.showReward = false;
          }
    })
    this.loadSelectedCoupons(); // Load selected coupons when component initializes
    //this.clearSelectedCoupons();
    
  }
  

  showRewards() {
    
    this.showReward = false;
      this.dataservice.fetchUserCoupon(this.current_userId).subscribe((data: any) => {
        //console.log(data);
        // this.couponState=data.state;
        // console.log(data.state);
            this.userCouponData = data.receivedCoupon;
            this.couponVisibility = new Array(this.userCouponData.length).fill(true);
        
          
        
      });
    
  }
  selectCoupon(coupon: any, index: number) {
    // Toggle visibility of coupon code details
    this.couponState='Selected';
   this.dataservice.updateCouponState(this.couponState,this.current_userId).subscribe(statedata=>{
    console.log(statedata);
   });
    this.showCouponCode = true;
    
    
    // Hide unselected coupons by setting their visibility to false
    this.couponVisibility = this.couponVisibility.map((visibility, i) => i === index);
   this.buttonText = this.selectedCoupons ? "Redeem" : "Choose";

    this.selectedCoupons.push(coupon);

    
    this.saveSelectedCoupons();
    
  }

  saveSelectedCoupons() {
    // Save the selected coupons to local storage
    localStorage.setItem(`selectedCoupons_${this.current_userId}`, JSON.stringify(this.selectedCoupons));
  }
  clearSelectedCoupons() {
    // Save the selected coupons to local storage
    localStorage.removeItem(`selectedCoupons_${this.current_userId}`);
    this.selectedCoupons = [];
  }


  loadSelectedCoupons() {
    // Load the selected coupons for the current user from local storage
    const selectedCouponsStr = localStorage.getItem(`selectedCoupons_${this.current_userId}`);
    if (selectedCouponsStr) {
      this.selectedCoupons = JSON.parse(selectedCouponsStr);
      this.showCode = true;
      this.selectedCoupons.forEach(element => {
        const currentDate = new Date();
        const endDate = new Date(this.selectedCoupons[element].doe); // Assuming doe is the end date property
    
      if (currentDate > endDate) {
        // If past the end date, disable the coupon
        this.selectedCoupons[element].disabled = true;
  
      }
        
      });
    }
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
