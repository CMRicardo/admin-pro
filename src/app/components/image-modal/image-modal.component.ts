import { Component, inject } from '@angular/core';
import { ImageModalService } from '@services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: ``
})
export class ImageModalComponent {
  public imageModalService = inject(ImageModalService)

  public imageToUpload?: File
  public imgTemp: string | ArrayBuffer | null = ''


  public closeModal () {
    this.imgTemp = null
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
}
