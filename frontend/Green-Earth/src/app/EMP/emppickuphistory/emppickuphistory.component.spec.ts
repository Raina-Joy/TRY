import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmppickuphistoryComponent } from './emppickuphistory.component';

describe('EmppickuphistoryComponent', () => {
  let component: EmppickuphistoryComponent;
  let fixture: ComponentFixture<EmppickuphistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmppickuphistoryComponent]
    });
    fixture = TestBed.createComponent(EmppickuphistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
