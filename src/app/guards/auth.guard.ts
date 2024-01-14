import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UsersService } from '@services/users.service'
import { tap } from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService)
  const router = inject(Router)

  return usersService.validateToken()
  .pipe(
    tap(isAuth => {
      if (!isAuth) {
        router.navigateByUrl('/login')
      }
    })
  )
}
