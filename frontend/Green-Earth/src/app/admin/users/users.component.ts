import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  resdata:any;

  constructor(private dataservice:DataService){}

  ngOnInit(): void {
    this.findAllusers();
  }
  findAllusers()
  {

    this.dataservice.findAllusers().subscribe(data=>{
      console.log(data);
      this.resdata = data.slice(1);
    })
    


  }

}
