import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {
  private _hideModal: boolean = true

  public type: 'users' | 'doctors' | 'hospitals' = 'users'
  public id: string = ''
  public img: string = ''

  get hideModal() {
    return this._hideModal
  }

  public openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image'
  ) {
    this.type = type
    this.id = id
    if (img.includes('https')) {
      this.img = img
    } else {
      this.img = `${baseUrl}/uploads/${type}/${id}`
    }

    this._hideModal = false
  }

  public closeModal() {
    this._hideModal = true
  }
}
