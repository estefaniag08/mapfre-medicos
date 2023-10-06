import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoEspecialidadComponent } from './paso-especialidad/paso-especialidad.component';
import { PasoContactoComponent } from './paso-contacto/paso-contacto.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioCotizacionComponent } from './formulario-cotizacion.component';

@NgModule({
  declarations: [
    PasoEspecialidadComponent,
    PasoContactoComponent,
    FormularioCotizacionComponent,
    //Revisar con Estefanía. No me permite declarar los componentes por mas de un modulo ===========================
    //Para que funcione necesita ser declarado por el modulo app.module.ts (FormGrup dentro de paso-***.component.html)
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [FormularioCotizacionComponent],
})
export class FormularioCotizacionModule {}
