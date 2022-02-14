import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyseContrainteComponent } from './analyse-contrainte.component';

const routes: Routes = [ {
  path: '',
  component: AnalyseContrainteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyseContrainteRoutingModule { }
