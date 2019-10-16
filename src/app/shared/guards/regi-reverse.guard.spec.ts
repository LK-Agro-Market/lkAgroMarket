import { TestBed, async, inject } from '@angular/core/testing';

import { RegiReverseGuard } from './regi-reverse.guard';

describe('RegiReverseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegiReverseGuard]
    });
  });

  it('should ...', inject([RegiReverseGuard], (guard: RegiReverseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
