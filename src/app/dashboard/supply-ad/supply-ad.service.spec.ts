import { TestBed } from '@angular/core/testing';

import { SupplyAdService } from './supply-ad.service';

describe('SupplyAdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyAdService = TestBed.get(SupplyAdService);
    expect(service).toBeTruthy();
  });
});
