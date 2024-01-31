import { Component, inject } from '@angular/core';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private usersService = inject(UsersService)
  public user = this.usersService.user

  public logout() {
    this.usersService.logout()
  }
}
