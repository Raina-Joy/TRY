import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {
  constructor(private dataservice:DataService, private authservice:AuthService){}
  public userid:string;
  public resdata:any = { results: [] };
  public count:number;
  public show:boolean = false;


  
  ngOnInit(): void {
  this.userid = this.authservice.getUserId();
  console.log(this.userid);
     
  }
  byDate()
  {
    this.show = true
    this.dataservice.getSortedEmpbydate(this.userid).subscribe(data=>{
      console.log(data);
     this.count = data.count;
    this.resdata = data.documents;
    })

  }

}
