import { TestBed } from '@angular/core/testing';

import { Apiglobal } from './apiglobal';

describe('Apiglobal', () => {
  let service: Apiglobal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiglobal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
