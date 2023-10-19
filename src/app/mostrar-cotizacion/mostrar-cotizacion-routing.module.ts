import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarCotizacionComponent } from './mostrar-cotizacion.component';
import { IniciarCotizacionGuard } from '../guards/iniciar-cotizacion.guard';

const routes: Routes = [
  { path: '', component: MostrarCotizacionComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarCotizacionRoutingModule {}
