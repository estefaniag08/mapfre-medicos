import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoEspecialidadComponent } from './paso-especialidad/paso-especialidad.component';
import { PasoContactoComponent } from './paso-contacto/paso-contacto.component';

@NgModule({
  declarations: [
    //PasoEspecialidadComponent,
    //PasoContactoComponent
    //Revisar con Estefanía. No me permite declarar los componentes por mas de un modulo ===========================
    //Para que funcione necesita ser declarado por el modulo app.module.ts (FormGrup dentro de paso-***.component.html)
  
  ],
  imports: [
    CommonModule,
  ]
})
export class FormularioCotizacionModule { }
