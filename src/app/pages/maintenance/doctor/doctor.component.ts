import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import Swal from 'sweetalert2'

import { Doctor } from '@src/app/models/doctor.model'
import { Hospital } from '@src/app/models/hospital.model'

import { DoctorsService } from '@src/app/services/doctors.service'
import { HospitalsService } from '@src/app/services/hospitals.service'
import { delay } from 'rxjs'

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ``
})
export class DoctorComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private hospitalsService = inject(HospitalsService)
  private doctorsService = inject(DoctorsService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  public doctorForm!: FormGroup
  public hospitals: Hospital[] = []
  public currentHospital: Hospital | undefined
  public currentDoctor: Doctor | undefined

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({ id }) => this.fetchDoctor(id)
    })

    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.fetchHospitals()
    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: hospitalId => {
        this.currentHospital = this.hospitals.find(
          hospital => hospital.id === hospitalId
        )
      }
    })
  }

  private fetchDoctor(id: string) {
    if (id === 'new') return

    this.doctorsService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe({
        next: doctor => {
          this.currentDoctor = doctor
          const { name } = doctor
          const hospital = doctor.hospital?._id
          this.doctorForm.setValue({ name, hospital })
        },
        error: () => {
          this.router.navigateByUrl('/dashboard/doctors')
        }
      })
  }

  private fetchHospitals() {
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => (this.hospitals = hospitals)
    })
  }

  public saveDoctor() {
    const { name } = this.doctorForm.value

    if (this.currentDoctor) {
      // Update
      const data = {
        ...this.doctorForm.value,
        id: this.currentDoctor.id
      }
      this.doctorsService.updateDoctor(data).subscribe({
        next: () => {
          Swal.fire('Updated', `${name} updated succesfully`, 'success')
        }
      })
    } else {
      this.doctorsService.createDoctor(this.doctorForm.value).subscribe({
        next: res => {
          Swal.fire('Saved', `${name} saved succesfully`, 'success')
          this.router.navigateByUrl(`/dashboard/doctors/${res.doctor.id}`)
        }
      })
    }
  }
}
