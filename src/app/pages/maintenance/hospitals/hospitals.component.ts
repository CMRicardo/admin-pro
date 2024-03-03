import { Component, OnInit, inject } from '@angular/core'

import { HospitalsService } from '@src/app/services/hospitals.service'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit {
  private hospitalsService = inject(HospitalsService)

  ngOnInit(): void {
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => console.log(hospitals)
    })
  }
}
