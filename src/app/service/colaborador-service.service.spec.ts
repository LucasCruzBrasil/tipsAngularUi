import { TestBed } from '@angular/core/testing';

import { ColaboradorServiceService } from './colaborador-service.service';

describe('ColaboradorServiceService', () => {
  let service: ColaboradorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboradorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
