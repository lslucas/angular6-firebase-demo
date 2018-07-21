import { TestBed, inject } from '@angular/core/testing';

import { OauthService } from './auth.service';

describe('OauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthService]
    });
  });

  it('should be created', inject([OauthService], (service: OauthService) => {
    expect(service).toBeTruthy();
  }));
});
