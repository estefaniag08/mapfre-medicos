import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdjuntarDocumentosComponent } from './adjuntar-documentos/adjuntar-documentos.component';
import { IniciarCotizacionGuard } from './guards/iniciar-cotizacion.guard';

export const routes: Routes = [
  {
    path: 'documentos/:userId',
    loadChildren: () => import('./adjuntar-documentos/adjuntar-documentos.module').then((m) => m.AdjuntarDocumentosModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'mostrar-cotizacion',
    loadChildren: () =>
      import('./mostrar-cotizacion/mostrar-cotizacion.module').then(
        (m) => m.MostrarCotizacionModule
      ),
      canActivate: [IniciarCotizacionGuard]
  },
  {
    path: 'identificacion-medico',
    loadChildren: () =>
      import('./identificacion/identificacion.module').then(
        (m) => m.IdentificacionModule
      ),
      canActivate: [IniciarCotizacionGuard]
  },
  {
    path: 'resumen-cotizacion',
    loadChildren: () =>
      import('./resumen-cotizacion/resumen-cotizacion.module').then(
        (m) => m.ResumenCotizacionModule
      ),
      canActivate: [IniciarCotizacionGuard]
  },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
