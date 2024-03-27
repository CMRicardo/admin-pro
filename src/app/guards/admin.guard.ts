import { inject } from '@angular/core'
import { Router, type CanActivateFn } from '@angular/router'

import { UsersService } from '@app/services/users.service'

export const AdminGuard: CanActivateFn = () => {
  const usersService = inject(UsersService)
  const router = inject(Router)

  if (usersService.role === 'ADMIN_ROLE') {
    return true
  } else {
    router.navigateByUrl('/dashboard')
    return false
  }
}
