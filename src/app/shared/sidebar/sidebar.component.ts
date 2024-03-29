import { Component, inject } from '@angular/core'
import { SidebarService } from '@app/services/sidebar.service'
import { UsersService } from '@app/services/users.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  public sidebarService = inject(SidebarService)
  private usersService = inject(UsersService)

  public user = this.usersService.user
}
