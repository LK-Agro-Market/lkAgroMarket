import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallDemandAdComponent } from './showall-demand-ad.component';

describe('ShowallDemandAdComponent', () => {
  let component: ShowallDemandAdComponent;
  let fixture: ComponentFixture<ShowallDemandAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowallDemandAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallDemandAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
