import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCotizacionComponent } from './formulario-cotizacion.component';

describe('FormularioCotizacionComponent', () => {
  let component: FormularioCotizacionComponent;
  let fixture: ComponentFixture<FormularioCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
