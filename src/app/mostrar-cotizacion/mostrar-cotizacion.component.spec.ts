import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCotizacionComponent } from './mostrar-cotizacion.component';

describe('MostrarCotizacionComponent', () => {
  let component: MostrarCotizacionComponent;
  let fixture: ComponentFixture<MostrarCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
