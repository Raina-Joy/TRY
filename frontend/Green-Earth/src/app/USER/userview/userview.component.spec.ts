import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewComponent } from './userview.component'

describe('UserviewComponent', () => {
  let component: UserviewComponent;
  let fixture: ComponentFixture<UserviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserviewComponent]
    });
    fixture = TestBed.createComponent(UserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
