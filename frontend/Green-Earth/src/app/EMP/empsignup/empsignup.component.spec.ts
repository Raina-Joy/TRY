import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsignupComponent } from './empsignup.component';

describe('EmpsignupComponent', () => {
  let component: EmpsignupComponent;
  let fixture: ComponentFixture<EmpsignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpsignupComponent]
    });
    fixture = TestBed.createComponent(EmpsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
