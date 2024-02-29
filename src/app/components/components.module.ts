import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts'

import { IncrementatorComponent } from './incrementator/incrementator.component';
import { DonutComponent } from './donut/donut.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
  declarations: [
    IncrementatorComponent,
    DonutComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementatorComponent,
    ImageModalComponent,
    DonutComponent
  ]
})
export class ComponentsModule { }
