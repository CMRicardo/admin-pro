import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Hospital } from '@src/app/models/hospital.model'
import { HospitalsService } from '@src/app/services/hospitals.service'

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ``
})
export class DoctorComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private hospitalsService = inject(HospitalsService)

  public doctorForm!: FormGroup
  public hospitals: Hospital[] = []

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: ['Alejandro', Validators.required],
      hospital: ['', Validators.required]
    })

    this.fetchHospitals()
  }

  public fetchHospitals() {
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => {
        this.hospitals = hospitals
      }
    })
  }

  public saveDoctor() {
    console.log(this.doctorForm.value)
  }
}
