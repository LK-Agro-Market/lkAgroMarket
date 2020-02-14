import { TestBed } from '@angular/core/testing';

import { ViewSupplyAdService } from './view-supply-ad.service';

describe('ViewSupplyAdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewSupplyAdService = TestBed.get(ViewSupplyAdService);
    expect(service).toBeTruthy();
  });
});
