import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBuyerAdComponent } from './comment-buyer-ad.component';

describe('CommentBuyerAdComponent', () => {
  let component: CommentBuyerAdComponent;
  let fixture: ComponentFixture<CommentBuyerAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentBuyerAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBuyerAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
