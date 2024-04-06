import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisepickupComponent } from './raisepickup.component';

describe('RaisepickupComponent', () => {
  let component: RaisepickupComponent;
  let fixture: ComponentFixture<RaisepickupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaisepickupComponent]
    });
    fixture = TestBed.createComponent(RaisepickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
