import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-emppickuphistory',
  templateUrl: './emppickuphistory.component.html',
  styleUrls: ['./emppickuphistory.component.css']
})
export class EmppickuphistoryComponent implements OnInit {
constructor(private dataservice:DataService, private authservice:AuthService){}
public userid:string;
public resdata:any = { results: [] };
public count:number;

ngOnInit(): void {
this.userid = this.authservice.getUserId();
this.dataservice.findEmpbyIdandStatus(this.userid).subscribe(data=>{
  console.log(data);
  this.resdata = data;
  this.count = this.resdata.count;
})

  
}

}
