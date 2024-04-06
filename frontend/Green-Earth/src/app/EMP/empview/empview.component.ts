import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/auth-service';
@Component({
  selector: 'app-empview',
  templateUrl: './empview.component.html',
  styleUrls: ['./empview.component.css']
})
export class EmpviewComponent implements OnInit, OnDestroy {
  private authentificationSub:Subscription;
  userAuthenticated = false;
  public current_user:string;
  public current_userId:string;
  constructor(private authservice:AuthService){}


  ngOnDestroy(): void {
    this.authentificationSub.unsubscribe();
  }
  ngOnInit(): void {
    this.current_user = this.authservice.getUser();
    this.current_userId=this.authservice.getUserId();
    this.userAuthenticated = this.authservice.getIsAuthenticated();
    this.authentificationSub = this.authservice.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    })
  }
  logout()
  {
    this.authservice.logoutEmp();
  }



  isNavbarOpaque = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // You can adjust the scroll threshold based on your needs
    const scrollThreshold = 5;

    this.isNavbarOpaque = scrollPosition > scrollThreshold;
  }

}
