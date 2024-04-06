import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupreqComponent } from './pickupreq.component';

describe('PickupreqComponent', () => {
  let component: PickupreqComponent;
  let fixture: ComponentFixture<PickupreqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupreqComponent]
    });
    fixture = TestBed.createComponent(PickupreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
