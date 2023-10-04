import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjuntarDocumentosComponent } from '../adjuntar-documentos/adjuntar-documentos.component';
import { IdentificacionComponent } from '../identificacion/identificacion.component';
import { MostrarCotizacionComponent } from '../mostrar-cotizacion/mostrar-cotizacion.component';
import { ResumenCotizacionComponent } from '../resumen-cotizacion/resumen-cotizacion.component';
import { StepFormComponent } from './step-form.component';


const routes: Routes = [
  { path: '', component: StepFormComponent, pathMatch: 'full' },
  { path: 'mostrar-cotizacion', component: MostrarCotizacionComponent },
  { path: 'identificacion-medico', component: IdentificacionComponent },
  { path: 'adjuntar-documentos/:userId', component: AdjuntarDocumentosComponent },
  { path: 'resumen-cotizacion', component: ResumenCotizacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepFormRoutingModule { }
