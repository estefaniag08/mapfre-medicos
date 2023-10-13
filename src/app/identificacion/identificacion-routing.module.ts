import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificacionComponent } from './identificacion.component';

const routes: Routes = [
  { path: '', component: IdentificacionComponent, pathMatch: 'full' },

  {
    path: 'adjuntar-documentos/:userId',
    loadChildren: () =>
      import('./../adjuntar-documentos/adjuntar-documentos.module').then(
        (m) => m.AdjuntarDocumentosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificacionRoutingModule {}
