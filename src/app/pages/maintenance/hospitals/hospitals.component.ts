import { Component, OnInit, inject } from '@angular/core'
import { Hospital } from '@src/app/models/hospital.model'

import { HospitalsService } from '@src/app/services/hospitals.service'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit {
  private hospitalsService = inject(HospitalsService)

  public hospitals: Hospital[] = []
  public isLoading: boolean = true

  ngOnInit(): void {
    this.fetchHospitals()
  }

  private fetchHospitals() {
    this.isLoading = true
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => {
        this.hospitals = hospitals
        this.isLoading = false
      }
    })
  }
}
