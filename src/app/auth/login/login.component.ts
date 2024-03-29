import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  inject
} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import Swal from 'sweetalert2'

import { UsersService } from '@app/services/users.service'
import { LoginForm } from '@app/interfaces/login-form.interface'

declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)
  private ngZone = inject(NgZone)
  @ViewChild('googleBtn') private googleBtn!: ElementRef

  ngAfterViewInit(): void {
    this.googleInit()
  }

  private googleInit() {
    google.accounts.id.initialize({
      client_id:
        '889812081759-jh26ii864l98h0ujg4ndqf5s78o91ra1.apps.googleusercontent.com',
      callback: (res: any) => this.handleCredentialResponse(res)
    })
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    )
    google.accounts.id.prompt() // also display the One Tap dialog
  }

  private handleCredentialResponse(response: any) {
    this.usersService.loginGoogle(response.credential).subscribe({
      next: () => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
      }
    })
  }

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') ?? '',
      [Validators.required, Validators.email]
    ],
    password: ['', [Validators.required]],
    rememberMe: [false]
  })

  public login() {
    if (this.loginForm.invalid) return
    this.usersService.loginUser(this.loginForm.value as LoginForm).subscribe({
      next: () => {
        if (this.loginForm.get('rememberMe')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value as string
          )
        } else {
          localStorage.removeItem('email')
        }
        this.router.navigateByUrl('/dashboard')
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    })
  }
}
