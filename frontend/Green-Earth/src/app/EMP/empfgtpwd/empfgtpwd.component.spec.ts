import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpfgtpwdComponent } from './empfgtpwd.component';

describe('EmpfgtpwdComponent', () => {
  let component: EmpfgtpwdComponent;
  let fixture: ComponentFixture<EmpfgtpwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpfgtpwdComponent]
    });
    fixture = TestBed.createComponent(EmpfgtpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
