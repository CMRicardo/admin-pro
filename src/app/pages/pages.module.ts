import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ComponentsModule } from '../components/components.module'
import { SharedModule } from '../shared/shared.module'
import { PipesModule } from '../pipes/pipes.module'

import { Chart1Component } from './chart1/chart1.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PagesComponent } from './pages.component'
import { ProgressComponent } from './progress/progress.component'
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { PromisesComponent } from './promises/promises.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './maintenance/users/users.component'
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component'
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';
import { SearchComponent } from './search/search.component'

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule {}
