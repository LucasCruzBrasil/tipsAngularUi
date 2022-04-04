import { TestBed } from '@angular/core/testing';

import { ValoresServiceService } from './valores-service.service';

describe('ValoresServiceService', () => {
  let service: ValoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
