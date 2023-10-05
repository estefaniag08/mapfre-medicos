import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormularioCotizacionModule } from '../formularios-medicos/formulario-cotizacion/formulario-cotizacion.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, FormularioCotizacionModule],
})
export class HomeModule {}
