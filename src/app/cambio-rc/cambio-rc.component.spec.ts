import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioRcComponent } from './cambio-rc.component';

describe('CambioRcComponent', () => {
  let component: CambioRcComponent;
  let fixture: ComponentFixture<CambioRcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioRcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
