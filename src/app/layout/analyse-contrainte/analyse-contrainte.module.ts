import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalyseContrainteRoutingModule } from './analyse-contrainte-routing.module';
import { AnalyseContrainteComponent } from './analyse-contrainte.component';
import { LoadingComponent } from './loading'
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
  declarations: [ LoadingComponent,AnalyseContrainteComponent],
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    FormsModule,
    ProgressBarModule,
    HttpClientModule,
    ButtonModule,

    AnalyseContrainteRoutingModule
  ],
  providers: [],
})
export class AnalyseContrainteModule { }
