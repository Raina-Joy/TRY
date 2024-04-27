import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-puhistory',
  templateUrl: './puhistory.component.html',
  styleUrls: ['./puhistory.component.css']
})
export class PuhistoryComponent implements OnInit {
  public custom_userid:string;
  responseData: any[];
  textdata: string;

  constructor(private authservice:AuthService, private dataservice:DataService){}
  ngOnInit(): void {
    this.custom_userid = this.authservice.getCustomuserid();
    console.log(this.custom_userid);
    this.dataservice.getPickupsByCuid(this.custom_userid).subscribe(data=>{
      console.log(data)
      this.responseData = data;
      this.responseData.forEach(element => {
        if(element.status == 'Pending' || element.status == 'Assigned')
          {
            this.textdata = "Your pickup is processing"
          }
          else if(element.status == 'Confirmed')
            {
              this.textdata = "Your pickup is confirmed by the pickup agent."
            }
            else if(element.status == 'Finished')
              {
                this.textdata = "Pickup finished."
              }

      });
    
    })
    
    
  }

}
