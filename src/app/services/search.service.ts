import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'

import { environment } from '@environments/environment'

import { User } from '@app/models/user.model'
import { Hospital } from '@app/models/hospital.model'
import { Doctor } from '@app/models/doctor.model'
import { GlobalSearchResponse } from '@app/interfaces/global-search.interface'

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

  public globalSearch(query: string) {
    const url = `${baseUrl}/all/${query}`
    return this.http.get<GlobalSearchResponse>(url, this.headers)
  }

  private transformUsers(res: any[]): User[] {
    return res.map(({ name, email, img, google, role, uid }) => {
      return new User(name, email, undefined, img, google, role, uid)
    })
  }

  private transformHospitals(res: any[]): Hospital[] {
    return res.map(({ name, id, user, img }) => {
      return new Hospital(name, id, user, img)
    })
  }

  private transformDoctors(res: any[]): Doctor[] {
    return res.map(({ name, id, user, img, hospital }) => {
      return new Doctor(name, id, user, img, hospital)
    })
  }

  public search(
    type: 'users' | 'hospitals' | 'doctors',
    query: string
  ): Observable<Doctor[] | Hospital[] | User[]> {
    const url = `${baseUrl}/all/collection/${type}/${query}`
    return this.http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(res.results)
          case 'hospitals':
            return this.transformHospitals(res.results)
          case 'doctors':
            return this.transformDoctors(res.results)
          default:
            return []
        }
      })
    )
  }
}
