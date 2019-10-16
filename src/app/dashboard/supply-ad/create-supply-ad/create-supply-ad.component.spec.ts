import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplyAdComponent } from './create-supply-ad.component';

describe('CreateSupplyAdComponent', () => {
  let component: CreateSupplyAdComponent;
  let fixture: ComponentFixture<CreateSupplyAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSupplyAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupplyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
