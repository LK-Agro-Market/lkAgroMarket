import { TestBed } from '@angular/core/testing';

import { SearchSupplyAdsService } from './search-supply-ads.service';

describe('SearchSupplyAdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchSupplyAdsService = TestBed.get(SearchSupplyAdsService);
    expect(service).toBeTruthy();
  });
});
