import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth-service';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit, OnDestroy {
  private authentificationSub:Subscription;
  userAuthenticated = false;
  public current_user: string;
  public current_userid:string;

  constructor(private authservice:AuthService){}
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
    this.authservice.logout();
  }
}
