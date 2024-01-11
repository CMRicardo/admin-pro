import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import Swal from 'sweetalert2'

import { UsersService } from '@services/users.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)
  private passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/

  private equalPasswords = (passwordName: string, confirmationName: string) => {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(passwordName)
      const confirmationControl = formGroup.get(confirmationName)
      if (Boolean(passwordControl!.value === confirmationControl!.value)) {
        confirmationControl?.setErrors(null)
      } else {
        confirmationControl?.setErrors({ notEqualPass: true })
      }
    }
  }

  public registerForm = this.formBuilder.group({
    name: ['Ricardo', [Validators.required]],
    email: ['test100@email.com', [Validators.required, Validators.email]],
    password: ['Admin123', [Validators.required, Validators.pattern(this.passwordRegex)]],
    passwordConfirm: ['Admin123', [Validators.required]],
    terms: [true, [Validators.requiredTrue]],
  }, {
    validators: this.equalPasswords('password', 'passwordConfirm')
  })

  public createUser = () => {
    if (this.registerForm.invalid) return

    this.usersService.createUser(this.registerForm.value)
      .subscribe({
        next: res => {
          console.log(res)
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error')
        }
      })
  }

  public notValidField = (field: string): boolean => {
    return Boolean(
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    )
  }

  public areNotEqualPasswords = () => {
    const password = this.registerForm.get('password')!.value
    const confirmation = this.registerForm.get('passwordConfirm')!.value

    return !(password === confirmation)
  }
}
