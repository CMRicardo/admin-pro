import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { map } from 'rxjs'

import { environment } from '@src/environments/environment'

import { HospitalsResponse } from '../interfaces/fetch-hospitals.interface'
import { CreateHospitalResponse } from '../interfaces/create-hospital.interface'

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

  public fetchHospitals() {
    const url = `${baseUrl}/hospitals`
    return this.http
      .get<HospitalsResponse>(url, this.headers)
      .pipe(map(res => res.hospitals))
  }

  public createHospital(name: string) {
    const url = `${baseUrl}/hospitals`
    return this.http.post<CreateHospitalResponse>(url, { name }, this.headers)
  }
  public updateHospital(id: string, name: string) {
    const url = `${baseUrl}/hospitals/${id}`
    return this.http.put(url, { name }, this.headers)
  }
  public deleteHospital(id: string) {
    const url = `${baseUrl}/hospitals/${id}`
    return this.http.delete(url, this.headers)
  }
}
