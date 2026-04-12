import { TestBed } from '@angular/core/testing';

import { Recordservice } from './recordservice';

describe('Recordservice', () => {
  let service: Recordservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recordservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
