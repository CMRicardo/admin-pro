import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'

import { environment } from '@environments/environment'

import { DoctorsResponse } from '../interfaces/fetch-doctors.interface'
import { CreateDoctorResponse } from '../interfaces/create-doctor.interface'
import { Doctor } from '../models/doctor.model'
import { DoctorByIdResponse } from '../interfaces/fetch-doctor.interface'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
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

  public fetchDoctors() {
    const url = `${baseUrl}/doctors`
    return this.http
      .get<DoctorsResponse>(url, this.headers)
      .pipe(map(res => res.doctors))
  }

  public getDoctorById(id: string) {
    const url = `${baseUrl}/doctors/${id}`
    return this.http
      .get<DoctorByIdResponse>(url, this.headers)
      .pipe(map(res => res.doctor))
  }

  public createDoctor(doctor: { name: string; hospital: string }) {
    const url = `${baseUrl}/doctors`
    return this.http.post<CreateDoctorResponse>(url, doctor, this.headers)
  }
  public updateDoctor(doctor: Doctor) {
    const url = `${baseUrl}/doctors/${doctor.id}`
    return this.http.put(url, doctor, this.headers)
  }
  public deleteDoctor(id: string) {
    const url = `${baseUrl}/doctors/${id}`
    return this.http.delete(url, this.headers)
  }
}
