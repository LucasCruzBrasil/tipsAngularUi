import { TestBed } from '@angular/core/testing';

import { GrujaResolverGuard } from './gruja-resolver.guard';

describe('GrujaResolverGuard', () => {
  let guard: GrujaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrujaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
