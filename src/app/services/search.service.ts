import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient)

  get token(): string {
    return localStorage.getItem('token') || ''
  }
  private get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUsers(res: any[]): User[] {
    return res.map(({ name, email, img, google, role, uid }) => {
      return new User(name, email, undefined, img, google, role, uid)
    })
  }

  public search(
    type: 'users' | 'hospitals' | 'doctors',
    query: string
  ) {
    const url = `${baseUrl}/all/collection/${type}/${query}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'users': return this.transformUsers(res.results)
            default:
              return []
          }
        })
      )
  }
}
