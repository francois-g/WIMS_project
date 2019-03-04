import { TestBed } from '@angular/core/testing';

import { PricetowinService } from './pricetowin.service';

describe('PricetowinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricetowinService = TestBed.get(PricetowinService);
    expect(service).toBeTruthy();
  });
});
