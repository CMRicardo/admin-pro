import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { Observable, catchError, map, of, tap } from 'rxjs'

import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)

  public validateToken = (): Observable<boolean> => {
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${baseUrl}/auth/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
      }),
      map(res => true),
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
    console.log({ token })

    return this.http.post(`${baseUrl}/auth/google`, { token })
      .pipe(
        tap(
          (res: any) => {
            localStorage.setItem('token', res.token)
          }
        )
      )
  }
}
