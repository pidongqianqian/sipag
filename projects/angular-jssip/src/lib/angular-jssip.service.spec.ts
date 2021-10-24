import { TestBed } from '@angular/core/testing';

import { AngularJssipService } from './angular-jssip.service';

describe('AngularJssipService', () => {
  let service: AngularJssipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularJssipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
