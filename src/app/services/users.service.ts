import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { Observable, catchError, map, of, tap } from 'rxjs'

import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'
import { environment } from '../../environments/environment'
import { Router } from '@angular/router'
import { User } from '../models/user.model'

declare const google: any
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)
  private router = inject(Router)
  public user?: User

  public validateToken = (): Observable<boolean> => {
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${baseUrl}/auth/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      map((res: any) => {
        const { email, name, role, google, img = '', uid } = res.user
        this.user = new User(name, email, '', img, google, role, uid)
        localStorage.setItem('token', res.token)
        return true
      }),
      catchError(err => of(false))
    )
  }

  public createUser = (formData: RegisterForm) => {
    return this.http.post(`${baseUrl}/users`, formData)
      .pipe(
        tap(
          (res: any) => localStorage.setItem('token', res.token)
        )
      )
  }
  public loginUser = (formData: LoginForm) => {
    return this.http.post(`${baseUrl}/auth`, formData)
      .pipe(
        tap(
          (res: any) => localStorage.setItem('token', res.token)
        )
      )
  }

  public loginGoogle = (token: string) => {
    return this.http.post(`${baseUrl}/auth/google`, { token })
      .pipe(
        tap(
          (res: any) => {
            localStorage.setItem('token', res.token)
          }
        )
      )
  }

  public logout = () => {
    localStorage.removeItem('token')
    google.accounts.id.revoke('ricardocorrales84@gmail.com', () => {
      this.router.navigateByUrl('/login')
    })
  }
}
