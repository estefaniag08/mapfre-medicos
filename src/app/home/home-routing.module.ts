import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarCotizacionGuard } from '../guards/iniciar-cotizacion.guard';
import { HomeComponent } from './home.component';

/**
 * @description Array de rutas correspondientes al dashboard del usuario logueado
 */
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'home', redirectTo: '' },
  {
    path: 'mostrar-cotizacion',
    loadChildren: () => import('./../mostrar-cotizacion/mostrar-cotizacion.module').then((m) => m.MostrarCotizacionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
