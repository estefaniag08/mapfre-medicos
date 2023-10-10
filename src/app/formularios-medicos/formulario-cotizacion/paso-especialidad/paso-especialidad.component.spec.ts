import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoEspecialidadComponent } from './paso-especialidad.component';

describe('PasoEspecialidadComponent', () => {
  let component: PasoEspecialidadComponent;
  let fixture: ComponentFixture<PasoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoEspecialidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
