import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth-service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sb-nav',
  templateUrl: './sb-nav.component.html',
  styleUrls: ['./sb-nav.component.css']
})
export class SbNavComponent implements OnInit, OnDestroy {
  private authentificationSub:Subscription;
  userAuthenticated = false;
  public current_user: string;
  public current_userid:string;

  constructor(private authservice:AuthService, private http:HttpClient){}
  ngOnDestroy(): void {
    this.authentificationSub.unsubscribe();
  }
  ngOnInit(): void {
    this.current_user = this.authservice.getUser();
    this.current_userid = this.authservice.getUserId();
    this.userAuthenticated = this.authservice.getIsAuthenticated();
    this.authentificationSub = this.authservice.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    })
  }
  logout()
  {
    this.authservice.logoutAdmin();
  }


}
