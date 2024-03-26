import { Component, inject } from '@angular/core'

import { UsersService } from '@app/services/users.service'
import { SearchService } from '@app/services/search.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private usersService = inject(UsersService)
  private searchService = inject(SearchService)

  public user = this.usersService.user

  public logout() {
    this.usersService.logout()
  }

  public search(value: string) {
    if (value.length === 0) return
    console.log(value)
  }
}
