import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandAdComponent } from './demand-ad.component';

describe('DemandAdComponent', () => {
  let component: DemandAdComponent;
  let fixture: ComponentFixture<DemandAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemandAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
