import { TestBed } from '@angular/core/testing';

import { EmployeeAuthGuard } from './employee-auth-guard.service';

describe('EmployeeAuthGuard', () => {
  let service: EmployeeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
