import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts'

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { Chart1Component } from './chart1/chart1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    NgChartsModule,

    ComponentsModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent
  ]
})
export class PagesModule { }
