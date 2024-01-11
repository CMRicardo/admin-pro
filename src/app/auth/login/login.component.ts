import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@services/users.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)

  public loginForm = this.formBuilder.group({
    email: ['test100@email.com',[Validators.required, Validators.email]],
    password: ['Admin123', [Validators.required]],
    rememberMe: [false]
  })

  public login() {
    if (this.loginForm.invalid) return
    this.usersService.loginUser(this.loginForm.value as LoginForm)
      .subscribe({
        next: res => {
          console.log(res);
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error')
        }
      })
    
    // this.router.navigateByUrl('/dashboard')
  }
}
