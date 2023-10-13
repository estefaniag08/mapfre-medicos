import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarCotizacionComponent } from './mostrar-cotizacion.component';

const routes: Routes = [
  { path: '', component: MostrarCotizacionComponent, pathMatch: 'full' },
  {
    path: 'identificacion-medico',
    loadChildren: () =>
      import('./../identificacion/identificacion.module').then(
        (m) => m.IdentificacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarCotizacionRoutingModule {}
