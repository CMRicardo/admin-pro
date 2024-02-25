import { Component, inject } from '@angular/core';
import { UsersService } from '@services/users.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {
  private usersService = inject(UsersService)

  public totalUsers: number = 0
  public users: User[] = []

  ngOnInit(): void {
    this.usersService.fetchUsers()
      .subscribe({
        next: ({total, users}) => {
          this.totalUsers = total
          this.users = users
        }
      })
  }
}
