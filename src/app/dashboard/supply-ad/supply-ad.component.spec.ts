import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyAdComponent } from './supply-ad.component';

describe('SupplyAdComponent', () => {
  let component: SupplyAdComponent;
  let fixture: ComponentFixture<SupplyAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplyAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
