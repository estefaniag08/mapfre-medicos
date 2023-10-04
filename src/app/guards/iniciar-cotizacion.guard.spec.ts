import { TestBed } from '@angular/core/testing';

import { IniciarCotizacionGuard } from './iniciar-cotizacion.guard';

describe('IniciarCotizacionGuard', () => {
  let guard: IniciarCotizacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IniciarCotizacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
