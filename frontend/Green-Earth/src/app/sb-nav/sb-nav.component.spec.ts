import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbNavComponent } from './sb-nav.component';

describe('SbNavComponent', () => {
  let component: SbNavComponent;
  let fixture: ComponentFixture<SbNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbNavComponent]
    });
    fixture = TestBed.createComponent(SbNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
