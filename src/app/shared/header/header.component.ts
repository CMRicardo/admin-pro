import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { UsersService } from '@app/services/users.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private usersService = inject(UsersService)
  private router = inject(Router)

  public user = this.usersService.user

  public logout() {
    this.usersService.logout()
  }

  public search(query: string) {
    if (query.length === 0) return
    this.router.navigateByUrl(`/dashboard/search/${query}`)
  }
}
