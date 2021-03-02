import { TestBed } from '@angular/core/testing';

import { ExhibitApiService } from './exhibit-api.service';

describe('ExhibitApiService', () => {
  let service: ExhibitApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
