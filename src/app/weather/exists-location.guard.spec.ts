import { TestBed } from '@angular/core/testing';

import { ExistsLocationGuard } from './exists-location.guard';

describe('ExistsLocationGuard', () => {
  let guard: ExistsLocationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExistsLocationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
