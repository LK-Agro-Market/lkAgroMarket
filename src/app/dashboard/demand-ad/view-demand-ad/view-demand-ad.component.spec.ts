import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDemandAdComponent } from './view-demand-ad.component';

describe('ViewDemandAdComponent', () => {
  let component: ViewDemandAdComponent;
  let fixture: ComponentFixture<ViewDemandAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDemandAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDemandAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
