import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@services/users.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

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
  @ViewChild('googleBtn') private googleBtn!: ElementRef

  ngAfterViewInit(): void {
    this.googleInit()
  }

  private googleInit() {
    google.accounts.id.initialize({
      client_id: '889812081759-jh26ii864l98h0ujg4ndqf5s78o91ra1.apps.googleusercontent.com',
      callback: (res: any) => this.handleCredentialResponse(res)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  private handleCredentialResponse(response: any) {
    this.usersService.loginGoogle(response.credential)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard')
        }
      })
  }

  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') ?? '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  })

  public login() {
    if (this.loginForm.invalid) return
    this.usersService.loginUser(this.loginForm.value as LoginForm)
      .subscribe({
        next: res => {
          if (Boolean(this.loginForm.get('rememberMe')?.value)) {
            localStorage.setItem('email', this.loginForm.get('email')?.value as string)
          } else {
            localStorage.removeItem('email')
          }
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error')
        }
      })

    this.router.navigateByUrl('/dashboard')
  }
}
