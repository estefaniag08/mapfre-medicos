import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoEspecialidadComponent } from './paso-especialidad/paso-especialidad.component';
import { PasoContactoComponent } from './paso-contacto/paso-contacto.component';


@NgModule({
  declarations: [
    PasoEspecialidadComponent,
    PasoContactoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormularioCotizacionModule { }
