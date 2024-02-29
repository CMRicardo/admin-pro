import { Component, inject } from '@angular/core';

import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';
import { UsersService } from '@services/users.service';
import { SearchService } from '@services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {
  private usersService = inject(UsersService)
  private searchService = inject(SearchService)

  public totalUsers: number = 0
  public users: User[] = []
  public usersTemp: User[] = []
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
          this.usersTemp = users
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

  public search(query: string) {
    if (query.length === 0) {
      this.users = this.usersTemp
      return
    }

    this.searchService.search('users', query)
      .subscribe((res) => {
        this.users = res
      })
  }

  public deleteUser(user: User) {
    if (user.uid === this.usersService.uid) {
      Swal.fire('Error', "You can't delete yourself", 'error')
      return
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(user)
          .subscribe({
            next: () => {
              this.fetchUsers()
              Swal.fire({
                title: "Deleted!",
                text: `User ${user.name} has been deleted.`,
                icon: "success"
              });
            }
          })
      }
    });
  }
}
