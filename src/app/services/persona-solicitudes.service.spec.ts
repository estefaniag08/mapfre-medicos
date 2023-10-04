import { TestBed } from '@angular/core/testing';

import { PersonaSolicitudesService } from './persona-solicitudes.service';

describe('PersonaSolicitudesService', () => {
  let service: PersonaSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
