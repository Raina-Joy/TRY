import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/data-service';
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

  constructor(private http:HttpClient, private dataservice:DataService){}
  ngOnInit(): void {
    
  }
  findAllpickup()
  {
    this.dataservice.findAllpickupreq().subscribe(data => {
      this.responseData = data;
  })
  }
  
  onRowClick(item: any):void {
    // Store the clicked row
    this.selectedRow = item;
    // You can access the specific properties here if needed
    //console.log('Clicked item pincode:', item.pincode);
    const targetPin = item.pincode;

    this.dataservice.fetchData(targetPin).subscribe(
      response => {
        this.empName= response.empname;
        this.empId=response.empid;
      },
      error => {
        console.error('Error sending data:', error);
      }
    );

 }
  assignEmp()
  {
    this.dataservice.sendData(this.empId,this.empName,this.selectedRow)
  }
}
