import { Pipe, PipeTransform } from '@angular/core'
import { environment } from '@src/environments/environment'

const BASE_URL = environment.baseUrl

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (image) return `${BASE_URL}/uploads/${type}/${image}`
    if (image.includes('http')) return image
    return `${BASE_URL}/uploads/${type}/no-image`
  }
}
