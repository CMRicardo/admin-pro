import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { Doctor } from '@src/app/models/doctor.model'
import { Hospital } from '@src/app/models/hospital.model'

import { DoctorsService } from '@src/app/services/doctors.service'
import { HospitalsService } from '@src/app/services/hospitals.service'
import Swal from 'sweetalert2'

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

  public doctorForm!: FormGroup
  public hospitals: Hospital[] = []
  public currentHospital: Hospital | undefined
  public currentDoctor: Doctor | undefined

  ngOnInit(): void {
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

  public fetchHospitals() {
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => (this.hospitals = hospitals)
    })
  }

  public saveDoctor() {
    const { name } = this.doctorForm.value
    this.doctorsService.createDoctor(this.doctorForm.value).subscribe({
      next: res => {
        Swal.fire('Saved', `${name} saved succesfully`, 'success')
        this.router.navigateByUrl(`/dashboard/doctors/${res.doctor.id}`)
      }
    })
  }
}
