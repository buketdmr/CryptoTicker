import { TestBed } from '@angular/core/testing';

import { SmartrateService } from './smartrate.service';

describe('SmartrateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmartrateService = TestBed.get(SmartrateService);
    expect(service).toBeTruthy();
  });
});
