import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplyAdsComponent } from './list-supply-ads.component';

describe('ListSupplyAdsComponent', () => {
  let component: ListSupplyAdsComponent;
  let fixture: ComponentFixture<ListSupplyAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListSupplyAdsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplyAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
