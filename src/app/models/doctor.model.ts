import { Hospital } from './hospital.model'

export interface DoctorUser {
  id: string
  name: string
  img: string
}

export class Doctor {
  constructor(
    public name: string,
    public id?: string,
    public user?: DoctorUser,
    public img?: string,
    public hospital?: Hospital
  ) {}
}
