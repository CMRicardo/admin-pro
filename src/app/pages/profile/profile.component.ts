import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { FileUploadService } from '@services/file-upload.service';
import { UsersService } from '@services/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)
  private fileUploadService = inject(FileUploadService)

  public profileForm!: FormGroup
  public user: User = this.usersService.user
  public imageToUpload?: File

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  public updateProfile() {
    this.usersService.updateProfile(this.profileForm.value)
      .subscribe((res: any) => {
        this.user.email = res.user.email
        this.user.name = res.user.name
        Swal.fire('Profile updated!', '', 'success')
      })
  }

  public changeImage(event: Event) {
    const fileFromForm = (event.target as any).files[0]
    const file: File = fileFromForm
    this.imageToUpload = file
  }
  
  public uploadImage() {
    if (!this.imageToUpload) return
    this.fileUploadService
      .updateImage(this.imageToUpload, 'users', this.user.uid || '')
      .then(console.log)
  }
}
