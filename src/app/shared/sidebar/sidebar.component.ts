import { Component, inject } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService)
  private usersService = inject(UsersService)
  
  public menuItems = this.sidebarService.menu
  public user = this.usersService.user
}
