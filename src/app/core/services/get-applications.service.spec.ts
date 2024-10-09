import { TestBed } from '@angular/core/testing';

import { GetApplicationsService } from './get-applications.service';

describe('GetApplicationsService', () => {
  let service: GetApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
