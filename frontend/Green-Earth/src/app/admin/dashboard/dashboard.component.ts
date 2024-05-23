import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data-service';
import { GooglePayButtonModule } from '@google-pay/button-angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

constructor(private http:HttpClient, private dataservice:DataService){
  this.paymentRequest =  {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4T66F4LVBM',
      merchantName: 'GREEN EARTH'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Salary',
      totalPrice: this.netmoney,
      currencyCode: 'INR',
      countryCode: 'IN'
    }

  }
}

  public count:number;
  public resdata:any=[];
  public resdata1:any=[];
  show: boolean=false;
  netmoney:string = '0';
  selectedEmployeeName: string | null = null;

  salForm:FormGroup
  paymentHandler: any = null;
  buttonWidth = 240;
  paymentRequest: google.payments.api.PaymentDataRequest;
  

  
   ngOnInit(): void {
    this.salForm = new FormGroup({
      from:new FormControl(''), 
      to: new FormControl(''),
      amt: new FormControl(''),
      bpay: new FormControl(''),
      selectedemp : new FormControl(''),
      
  
    });
  this.findAllEmp();
  
  this.invokeStripe();
  }
  onLoadPaymentData(event: any)
  {
    console.log(event,">>Data");
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OF91dSJWknz1DNyztmgqSEN7JniSmWyZAilqzy0SFocdtbuw4GMa10nOkCdHWs4RSc4Pzv7Xl6W9TpKn19MtXre00PcBU8Oh1',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  onEmployeeSelected(event: any) {
    const selectedValue = event.target.value;
    const selectedEmployee = this.resdata.find((employee: { _id: any; }) => employee._id === selectedValue);
    this.selectedEmployeeName = selectedEmployee ? selectedEmployee.name : null;
  }
  findAllEmp()
  {
    
    this.http.get<any[]>('http://localhost:3000/allemp').subscribe(data => {
      this.resdata = data;
      console.log(this.resdata);
      
    });
    
  }
  generateSal()
  {

    this.dataservice.genempSal(this.salForm.value.selectedemp, this.salForm.value.from, this.salForm.value.to).subscribe(res=>{
      console.log(res);
      this.resdata1 = res;
      this.count = (this.resdata1.count * this.salForm.value.amt)+ this.salForm.value.bpay;
      console.log(this.formatAmount(this.count));
      this.netmoney = this.count.toString();
      this.paymentRequest.transactionInfo.totalPrice = this.netmoney; 
      this.show=true;

    })
    

    
  }

  Pay()
  {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OF91dSJWknz1DNyztmgqSEN7JniSmWyZAilqzy0SFocdtbuw4GMa10nOkCdHWs4RSc4Pzv7Xl6W9TpKn19MtXre00PcBU8Oh1',
      locale: 'auto',
      token: (stripeToken: any) => { // Use an arrow function here
        console.log(stripeToken);
        alert('Stripe token generated!');
        this.dataservice.payment(this.count,stripeToken.id);
      },
    });
  
    paymentHandler.open({
      name: 'Green Earth',
      description: 'Salary',
      amount: this.count * 100,
      currency: 'INR'
    });

  }
  formatAmount(amount: number | bigint) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  

}
