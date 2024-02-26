import { environment } from '../../environments/environment'
const BASE_URL = environment.baseUrl

export class User {
  constructor (
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) { }

  get imageUrl() {
    if (this.img?.includes('http')) return this.img
    if (this.img) return `${BASE_URL}/uploads/users/${this.img}`
    return `${BASE_URL}/uploads/users/no-image`
  }
}