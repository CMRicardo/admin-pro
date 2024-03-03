import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { map } from 'rxjs'

import { environment } from '@src/environments/environment'

import { HospitalsResponse } from '../interfaces/fetch-hospitals.interface'

const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class HospitalsService {
  private http = inject(HttpClient)

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  public fetchHospitals = () => {
    const url = `${baseUrl}/hospitals`
    return this.http
      .get<HospitalsResponse>(url, this.headers)
      .pipe(map(res => res.hospitals))
  }
}
