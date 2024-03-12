import { TestBed } from '@angular/core/testing';

import { CommonDisplayService } from './common-display.service';

describe('CommonDisplayService', () => {
  let service: CommonDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
