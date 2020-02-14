import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplyAdsComponent } from './search-supply-ads.component';

describe('SearchSupplyAdsComponent', () => {
  let component: SearchSupplyAdsComponent;
  let fixture: ComponentFixture<SearchSupplyAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSupplyAdsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSupplyAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
