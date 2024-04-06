import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  
  responseData: any[];
  isViewEmployee:boolean = false;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
    
  }
  findAllEmp()
  {
    this.isViewEmployee=true;
    this.http.get<any[]>('http://localhost:3000/allemp').subscribe(data => {
      this.responseData = data;
    });
  }

  }
  

