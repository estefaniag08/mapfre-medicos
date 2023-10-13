import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjuntarDocumentosComponent } from './adjuntar-documentos.component';


const routes: Routes = [
  //{ path: 'documentos/:userId', component: AdjuntarDocumentosComponent, pathMatch: 'full' },
  { path: '', component: AdjuntarDocumentosComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjuntarDocumentosRoutingModule { }
