// Generated by https://quicktype.io

import { Doctor } from '../models/doctor.model'

export interface DoctorsResponse {
  ok: boolean
  doctors: Doctor[]
}

export interface Hospital {
  _id: string
  name: string
  img: string
}
