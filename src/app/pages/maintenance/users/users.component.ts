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
  public fromUser: number = 0
  public loading: boolean = true

  ngOnInit(): void {
    this.fetchUsers()
  }

  public fetchUsers() {
    this.loading = true
    this.usersService.fetchUsers(this.fromUser)
      .subscribe({
        next: ({ total, users }) => {
          this.totalUsers = total
          this.users = users
          this.loading = false
        }
      })
  }

  public changePage(value: number): void {
    this.fromUser += value
    if (this.fromUser < 0) this.fromUser = 0
    else if (this.fromUser >= this.totalUsers) {
      this.fromUser -= value
    }
    this.fetchUsers()
  }
}
