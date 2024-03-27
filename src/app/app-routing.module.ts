import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthRoutingModule } from './auth/auth-routing.module'
import { PagesRoutingModule } from './pages/pages-routing.module'

import { NoPageFoundComponent } from './no-page-found/no-page-found.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: NoPageFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
