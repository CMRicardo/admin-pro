// Generated by https://quicktype.io

import { HospitalUser } from '../models/hospital.model'

export interface HospitalsResponse {
  ok: boolean
  hospitals: Hospital[]
}

export interface Hospital {
  name: string
  user: HospitalUser
  id: string
}
