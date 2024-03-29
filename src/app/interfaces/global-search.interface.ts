// Generated by https://quicktype.io

import { Doctor } from '@app/models/doctor.model'
import { Hospital } from '@app/models/hospital.model'
import { User } from '@app/models/user.model'

export interface GlobalSearchResponse {
  ok: boolean
  users: User[]
  doctors: Doctor[]
  hospitals: Hospital[]
}
