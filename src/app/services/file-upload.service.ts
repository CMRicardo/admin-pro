import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

const baseURL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public async updateImage(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      // http://localhost:3000/api/uploads/users/65a03db104b9820940befb8f
      const url = `${baseURL}/uploads/${type}/${id}`
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': localStorage.getItem('token') || '' },
        body: formData
      })
      const data = await response.json()
      if (data.ok) return data.fileName
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
