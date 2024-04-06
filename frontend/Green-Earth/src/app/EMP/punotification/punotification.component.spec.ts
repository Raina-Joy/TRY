import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunotificationComponent } from './punotification.component';

describe('PunotificationComponent', () => {
  let component: PunotificationComponent;
  let fixture: ComponentFixture<PunotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PunotificationComponent]
    });
    fixture = TestBed.createComponent(PunotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
