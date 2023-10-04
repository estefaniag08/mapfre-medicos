import { TestBed } from '@angular/core/testing';

import { ConsultasPolizaMedicoService } from './consultas-poliza-medico.service';

describe('ConsultasPolizaMedicoService', () => {
  let service: ConsultasPolizaMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasPolizaMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
