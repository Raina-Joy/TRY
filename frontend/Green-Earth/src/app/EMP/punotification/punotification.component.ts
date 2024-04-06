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
  constructor(private http:HttpClient, private dataservice:DataService, private authservice:AuthService){}
  ngOnInit(): void {
    this.current_userId = this.authservice.getUserId();
    
    
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
}
