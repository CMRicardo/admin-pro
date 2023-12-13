import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Chart1Component } from "./chart1/chart1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'chart-1', component: Chart1Component },
      { path: 'promises', component: PromisesComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'rxjs', component: RxjsComponent },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }