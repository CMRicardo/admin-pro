import { EventEmitter, Injectable } from '@angular/core'
import { environment } from '@src/environments/environment'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {
  private _hideModal: boolean = true

  public type!: 'users' | 'doctors' | 'hospitals'
  public id: string = ''
  public img: string = ''

  public newImage: EventEmitter<string> = new EventEmitter<string>()

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
    console.log(img)

    if (img.includes('http')) {
      this.img = img
    } else {
      // http://localhost:3000/api/uploads/users/39271a69-b71c-44fc-b616-dcb25bcc1ed8.jpg
      this.img = `${baseUrl}/uploads/${type}/${id}.jpg`
    }
    this._hideModal = false
  }

  public closeModal() {
    this._hideModal = true
  }
}
