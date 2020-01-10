import { TestBed } from '@angular/core/testing';

import { DemandAdService } from './demand-ad.service';

describe('DemandAdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandAdService = TestBed.get(DemandAdService);
    expect(service).toBeTruthy();
  });
});
