import { Component } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: ``
})
export class ImageModalComponent {
  public hideModal: boolean = false

  closeModal () {
    this.hideModal = true
  }
}
