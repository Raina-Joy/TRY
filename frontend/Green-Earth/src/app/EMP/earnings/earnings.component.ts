import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  public current_user:string;

  public resdata:any = { results: [] };
  public count:number;
  public show:boolean = false;
  salForm:FormGroup;


  
  ngOnInit(): void {
  this.userid = this.authservice.getUserId();
  this.current_user = this.authservice.getUser();

  console.log(this.userid);
  this.salForm = new FormGroup({
    from:new FormControl(''), 
    to: new FormControl(''),
    
    

  });
     
  }
  generateSal()
  {

    this.dataservice.genempSal(this.userid, this.salForm.value.from, this.salForm.value.to).subscribe(res=>{
      console.log(res);
      this.resdata = res;
      this.count = this.resdata.count;
      this.show=true;

    })

    
  }

}
