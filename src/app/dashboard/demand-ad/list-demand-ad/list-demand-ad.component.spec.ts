import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandAdComponent } from './list-demand-ad.component';

describe('ListDemandAdComponent', () => {
  let component: ListDemandAdComponent;
  let fixture: ComponentFixture<ListDemandAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
