import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data-service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  
  responseData: any[];
  responseData1: any[];
  allpost: any[];


  show1:boolean = false;
  show:boolean = false;

  pins:any;
  routeForm: FormGroup;

  constructor(private http:HttpClient, private dataservice:DataService){}
  ngOnInit(): void {
        
   
    this.routeForm = new FormGroup({
     
      selectedEmp: new FormControl(''),
      selectedPost1:new FormControl(''),
      selectedPost2:new FormControl(''),
      selectedPost3:new FormControl(''),

  
    })

    
    
  }
  FindallPost()
  {
    
  this.findAllEmp();
  this.http.get<any[]>('http://localhost:3000/allpost').subscribe(data => {
    this.allpost = data;
    //console.log(data);
  });
}
  findAllEmp()
  {
    this.show1=true;
    this.show=false;
    this.http.get<any[]>('http://localhost:3000/allemp').subscribe(data => {
      this.responseData = data;
    });
  }
  findAllEmpRoutes()
  {
    this.show1=false;

    this.show=true;
    this.http.get<any[]>('http://localhost:3000/allemproute').subscribe(data => {
      this.responseData1 = data;
      //console.log(data)
  

    });
  }
  getCollectionPins(collectionpins: any): string[] {
    return Object.values(collectionpins);
  }
  addEmpRoutes()
  {
    
    this.FindallPost();
    this.show1=false;

  }
  onSub()
  {
    console.log('selectedpins',this.routeForm.value.selectedEmp,this.routeForm.value.selectedPost1, this.routeForm.value.selectedPost2, this.routeForm.value.selectedPost3)
  }

  }
  

