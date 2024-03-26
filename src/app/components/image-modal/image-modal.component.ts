import { Component, inject } from '@angular/core'

import { ImageModalService } from '@app/services/image-modal.service'
import { FileUploadService } from '@app/services/file-upload.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: ``
})
export class ImageModalComponent {
  private fileUploadService = inject(FileUploadService)
  public imageModalService = inject(ImageModalService)

  public imageToUpload?: File
  public imgTemp: string | ArrayBuffer | null = ''

  public closeModal() {
    this.imgTemp = null
    this.imageToUpload = undefined
    this.imageModalService.closeModal()
  }

  public changeImage(event: Event) {
    const file = (event.target as any).files[0]
    this.imageToUpload = file
    if (!file) {
      this.imgTemp = null
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }
  public uploadImage() {
    if (!this.imageToUpload) return
    const { id, type } = this.imageModalService

    this.fileUploadService
      .updateImage(this.imageToUpload, type, id)
      .then(img => {
        Swal.fire('Image updated!', 'Changed image succesfully', 'success')
        this.closeModal()
        this.imageModalService.newImage.emit(img)
      })
      .catch(() => {
        Swal.fire('Error', 'Error uploading image', 'error')
      })
  }
}
