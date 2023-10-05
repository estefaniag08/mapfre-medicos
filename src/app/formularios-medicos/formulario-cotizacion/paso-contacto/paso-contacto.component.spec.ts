import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoContactoComponent } from './paso-contacto.component';

describe('PasoContactoComponent', () => {
  let component: PasoContactoComponent;
  let fixture: ComponentFixture<PasoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasoContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
