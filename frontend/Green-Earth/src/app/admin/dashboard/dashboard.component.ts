import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

constructor(private http:HttpClient, private dataservice:DataService){}

  public count:number;
  public resdata:any=[];
  salForm:FormGroup

  ngOnInit(): void {
    this.salForm = new FormGroup({
      from:new FormControl(''), 
      to: new FormControl(''),
      amt: new FormControl(''),
      selectedemp : new FormControl(''),
      
  
    });
  this.findAllEmp();
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
    })
   console.log(typeof(this.salForm.value.from));
    
  }

}
