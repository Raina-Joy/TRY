import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpviewComponent } from './empview.component';

describe('EmpviewComponent', () => {
  let component: EmpviewComponent;
  let fixture: ComponentFixture<EmpviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpviewComponent]
    });
    fixture = TestBed.createComponent(EmpviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
