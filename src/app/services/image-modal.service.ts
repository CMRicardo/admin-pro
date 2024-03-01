import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {
  private _hideModal: boolean = true

  get hideModal() {
    return this._hideModal
  }

  public openModal() {
    this._hideModal = false
  }

  public closeModal() {
    this._hideModal = true
  }
}
