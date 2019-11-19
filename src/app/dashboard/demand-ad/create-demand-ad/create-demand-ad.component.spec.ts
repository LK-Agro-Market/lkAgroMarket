import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandAdComponent } from './create-demand-ad.component';

describe('CreateDemandAdComponent', () => {
  let component: CreateDemandAdComponent;
  let fixture: ComponentFixture<CreateDemandAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDemandAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDemandAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
