import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuhistoryComponent } from './puhistory.component';

describe('PuhistoryComponent', () => {
  let component: PuhistoryComponent;
  let fixture: ComponentFixture<PuhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuhistoryComponent]
    });
    fixture = TestBed.createComponent(PuhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
