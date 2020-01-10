import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplyAdComponent } from './view-supply-ad.component';

describe('ViewSupplyAdComponent', () => {
  let component: ViewSupplyAdComponent;
  let fixture: ComponentFixture<ViewSupplyAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplyAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
