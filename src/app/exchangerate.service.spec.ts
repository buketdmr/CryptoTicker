import { TestBed } from '@angular/core/testing';

import { ExchangerateService } from './exchangerate.service';

describe('ExchangerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangerateService = TestBed.get(ExchangerateService);
    expect(service).toBeTruthy();
  });
});
