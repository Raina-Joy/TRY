import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth-service';
// import { NavbarService } from 'src/app/shared/nav-service';
@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit, OnDestroy {
  private authentificationSub:Subscription;
  userAuthenticated = false;
  constructor(private authservice:AuthService){}
  ngOnDestroy(): void {
    this.authentificationSub.unsubscribe();
  }
  ngOnInit(): void {
    
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
