import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenCotizacionComponent } from './resumen-cotizacion.component';


const routes: Routes = [
  { path: '', component: ResumenCotizacionComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenCotizacionRoutingModule { }
