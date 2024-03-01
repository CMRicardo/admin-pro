import { Component, inject } from '@angular/core';
import { ImageModalService } from '@services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: ``
})
export class ImageModalComponent {
  public imageModalService = inject(ImageModalService)

  closeModal () {
    this.imageModalService.closeModal()
  }
}
