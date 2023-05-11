import { TestBed } from '@angular/core/testing';

import { ContactServiceAsyncService } from './game-service-async.service';

describe('ContactServiceAsyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactServiceAsyncService = TestBed.get(ContactServiceAsyncService);
    expect(service).toBeTruthy();
  });
});
