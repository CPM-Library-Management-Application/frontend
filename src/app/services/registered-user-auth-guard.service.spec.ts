import { TestBed } from '@angular/core/testing';

import { RegisteredUserAuthGuardService } from './registered-user-auth-guard.service';

describe('RegisteredUserAuthGuardService', () => {
  let service: RegisteredUserAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredUserAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
