import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/data-service';
import { AuthService } from 'src/app/shared/auth-service';
@Component({
  selector: 'app-pickupreq',
  templateUrl: './pickupreq.component.html',
  styleUrls: ['./pickupreq.component.css']
})
export class PickupreqComponent implements OnInit {
  responseData: any[];
  selectedRow: any;
  empName: string;
  empId: string;
  public status: string;
  public current_user: string;
  public today: Date;
  public tdoayStr: string;
  public pickupid: string;
  public disableRow: boolean = false; // Add this property



  orderid: string;

  constructor(private http: HttpClient, private dataservice: DataService, private authservice: AuthService) { }
  ngOnInit(): void {
    this.current_user = this.authservice.getUser();

    // Create a new Date object representing the current date and time
    // Create a new Date object representing the current date and time
    // Create a new Date object representing the current date and time
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
    console.log(this.tdoayStr)






    this.findAllpickup();
  }
  findAllpickup() {
    this.dataservice.findAllpickupreq().subscribe(data => {
      this.responseData = data;
    })
  }

  onRowClick(item: any): void {
    // Store the clicked row
    this.selectedRow = item;
    console.log(this.selectedRow)
    this.orderid = item._id;


    // You can access the specific properties here if needed
    //console.log('Clicked item pincode:', item.pincode);
    //console.log('Clicked item pincode:', item._id);

    const targetPin = item.pincode;

    this.dataservice.fetchData(targetPin).subscribe(
      response => {
        this.empName = response.empname;
        this.empId = response.empid;
      },
      error => {
        console.error('Error sending data:', error);
      }
    );

  }
  isRowDisabled(status: string): boolean {
    return status === 'Finished';
  }
 
  assignEmp() {
    // Set the status of the selected row to 'assigned'
    //this.selectedRow.status = 'assigned';
    // Store the status in localStorage
    // localStorage.setItem('assignedStatus', JSON.stringify(this.selectedRow.status));
    // Send data to backend
    this.status = 'Assigned';
    console.log(this.status, this.orderid)
    this.dataservice.sendStatus(this.status, this.orderid).subscribe(
      response => {
        // Handle success response
        console.log("Status assigned successfully");
        this.findAllpickup();
        // Optionally, you can update responseData or perform any other action here
      },
      error => {
        // Handle error response
        console.error("Error assigning status:", error);
      }
    );;

    this.dataservice.sendData(this.empId, this.empName, this.selectedRow, this.tdoayStr, this.status);
  }
  // Method to dynamically change the button text based on the status
  //  getButtonText(status: string): string {
  //   return status === 'assigned' ? 'Assigned' : 'Assign employee';
  // }

  // Method to get the button color based on the status
  // getButtonColor(status: string): string {
  //   return status === 'assigned' ? 'btn-danger' : 'btn-info';
  // }
}

