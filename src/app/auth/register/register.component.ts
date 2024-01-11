import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)
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
    password: [, [Validators.required, Validators.pattern(this.passwordRegex)]],
    passwordConfirm: [, [Validators.required]],
    terms: [, [Validators.required, Validators.requiredTrue]],
  }, {
    validators: this.equalPasswords('password', 'passwordConfirm')
  })

  public createUser = () => {
    console.log(this.registerForm) 
    if (this.registerForm.valid) {
      console.log('All right');
    } else {
      console.log('Not so right');
      
    }
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
