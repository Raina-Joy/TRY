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
  responseData2: any;

  allpost: any[];
  selectedName: string;
  selectedId: string;
  empid: string;
  empname: string;
  emppin:number;



  selectedPincode: number;
  selectedRow: any;
  show1:boolean = false;
  show2:boolean = false;

  show:boolean = false;
  pins:any;
  routeForm: FormGroup;
  routeForm1: FormGroup;

  collectionpins:{
    pin1:number,
    pin2:number,
    pin3:number,

  } = {pin1:0,pin2:0, pin3:0}

  constructor(private http:HttpClient, private dataservice:DataService){}
  ngOnInit(): void {
        
   
    this.routeForm = new FormGroup({
     
      selectedEmp: new FormControl(''),
      selectedPost1:new FormControl(''),
      selectedPost2:new FormControl(''),
      selectedPost3:new FormControl(''),

  
    })
    this.routeForm1 = new FormGroup({
     
      selectedEmp1: new FormControl(''),
      selectedPost11:new FormControl(''),
      selectedPost22:new FormControl(''),
      selectedPost33:new FormControl(''),

  
    })

    
    
  }
  onRowClick(item: any): void {
    // Store the clicked row
    this.selectedRow = item;
    this.empid = item.empid;
    this.empname = item.empname;
    this.emppin = item.emppin;

    
    //console.log(this.selectedRow)
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
    this.show2 = false;
    this.http.get<any[]>('http://localhost:3000/allemp').subscribe(data => {
      this.responseData = data;
      
    });
  }
  findAllEmpRoutes()
  {
    this.show1=false;
    this.show2 = false;

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
    this.findAllEmpRoutes();
    this.show1=false;
    this.show = false;
    this.show2 = true;

  }
  onSub()
  {
     this.collectionpins.pin1=this.routeForm.value.selectedPost1;
    this.collectionpins.pin2=this.routeForm.value.selectedPost2;
    this.collectionpins.pin3=this.routeForm.value.selectedPost3;
    this.dataservice.addRoute(this.selectedId, this.routeForm.value.selectedEmp, 
      this.selectedPincode,this.collectionpins).subscribe(data=>{
        console.log(data);
      })
    //console.log(this.selectedId, this.routeForm.value.selectedEmp, 
      //this.selectedPincode,this.collectionpins)
  }
  updateSelection() {
    // Find the selected item based on the selected name
    const selectedItem = this.responseData.find(item => item.name === this.routeForm.value.selectedEmp);
    
    // Update selectedId and selectedPincode based on the selected item
    if (selectedItem) {
      this.selectedId = selectedItem._id;
      this.selectedPincode = selectedItem.pincode;
    }
  }

  clearForm() {
    this.routeForm.reset();
  }
removeEmp()
{
  
  this.dataservice.removeEmp(this.empid).subscribe((data:any)=>{
    if(data.status === true)
  {
    alert("Employee deleted")
    this.findAllEmp();
  }    
  })
  
}
removeRoute()
{
  
  this.dataservice.removeRoute(this.empid).subscribe((data:any)=>{
    if(data.status === true)
  {
    alert("Route deleted")
    this.findAllEmpRoutes();
  }    
  })
}
updateEmpRoutes()
{
  this.FindallPost();
  this.show1=false;
this.show = true;
  
}
onUpdate()
{
  this.collectionpins.pin1=this.routeForm1.value.selectedPost11;
  this.collectionpins.pin2=this.routeForm1.value.selectedPost22;
  this.collectionpins.pin3=this.routeForm1.value.selectedPost33;
  //console.log(this.empid,this.collectionpins);
  this.dataservice.updateRoute(this.empid,this.collectionpins).subscribe(data=>{
    console.log(data);
  })
  this.findAllEmpRoutes();
  
}

  }
  

