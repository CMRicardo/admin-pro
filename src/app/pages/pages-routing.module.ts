import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminGuard } from '@app/guards/admin.guard'
import { AuthGuard } from '@app/guards/auth.guard'

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
import { DoctorsComponent } from './maintenance/doctors/doctors.component'
import { DoctorComponent } from './maintenance/doctor/doctor.component'
import { SearchComponent } from './search/search.component'

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      // Dashboard
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' }
      },
      {
        path: 'chart-1',
        component: Chart1Component,
        data: { title: 'Chart 1' }
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account Settings' }
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'User Profile' }
      },
      {
        path: 'search/:query',
        component: SearchComponent,
        data: { title: 'Search' }
      },
      // Maintenance
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent,
        data: { title: 'Users maintenance' }
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitals maintenance' }
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Doctors maintenance' }
      },
      {
        path: 'doctors/:id',
        component: DoctorComponent,
        data: { title: 'Doctors maintenance' }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
