import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { Observable, catchError, map, of, tap } from 'rxjs'

import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'
import { environment } from '../../environments/environment'
import { Router } from '@angular/router'
import { User } from '../models/user.model'
import { UsersResponse } from '../interfaces/fetch-users.interface'

declare const google: any
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)
  private router = inject(Router)
  public user!: User

  get token(): string {
    return localStorage.getItem('token') || ''
  }
  get uid(): string {
    return this.user?.uid || ''
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  public validateToken = (): Observable<boolean> => {
    return this.http.get(`${baseUrl}/auth/renew`, {
      headers: { 'x-token': this.token }
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

  public updateProfile = (data: { email: string, name: string, role?: string }) => {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${baseUrl}/users/${this.uid}`, data, this.headers)
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
    if (this.user.google) {
      google.accounts.id.revoke(this.user.email, () => {
        this.router.navigateByUrl('/login')
      })
    }
    this.router.navigateByUrl('/login')
  }

  public fetchUsers = (from: number = 0) => {
    const url = `${baseUrl}/users?from=${from}`
    return this.http.get<UsersResponse>(url, this.headers)
      .pipe(
        map(res => {
          const users = res.users
            .map(
              ({ name, email, img, google, role, uid }) => new User(name, email, undefined, img, google, role, uid))
          return {
            total: res.total,
            users,
            ok: res.ok
          }
        })
      )
  }

  public deleteUser(user: User) {
    const url = `${baseUrl}/users/${user.uid}`
    return this.http.delete(url, this.headers)
  }
}
