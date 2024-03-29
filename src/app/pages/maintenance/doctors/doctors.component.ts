import { Component, OnDestroy, OnInit, inject } from '@angular/core'

import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'

import { Doctor } from '@app/models/doctor.model'
import { DoctorsService } from '@app/services/doctors.service'
import { ImageModalService } from '@app/services/image-modal.service'
import { SearchService } from '@app/services/search.service'

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: ``
})
export class DoctorsComponent implements OnInit, OnDestroy {
  private doctorsService = inject(DoctorsService)
  private imageModalService = inject(ImageModalService)
  private searchService = inject(SearchService)

  public doctors: Doctor[] = []
  public doctorsTemp: Doctor[] = []
  public isLoading = true
  public imgSubscription?: Subscription

  public fetchDoctors() {
    this.isLoading = true
    this.doctorsService.fetchDoctors().subscribe({
      next: doctors => {
        this.doctors = doctors
        this.doctorsTemp = doctors
        this.isLoading = false
      }
    })
  }
  ngOnInit(): void {
    this.fetchDoctors()
    this.imgSubscription = this.imageModalService.newImage.subscribe({
      next: () => this.fetchDoctors()
    })
  }
  ngOnDestroy(): void {
    this.imgSubscription?.unsubscribe()
  }

  public search(query: string) {
    if (query.length === 0) {
      this.doctors = this.doctorsTemp
      return
    }
    this.searchService.search('doctors', query).subscribe({
      next: doctors => (this.doctors = doctors)
    })
  }

  public openModal(doctor: Doctor) {
    if (!doctor.id) return
    this.imageModalService.openModal('doctors', doctor.id, doctor.img)
  }

  public deleteDoctor(doctor: Doctor) {
    if (!doctor.id) return
    this.doctorsService.deleteDoctor(doctor.id).subscribe({
      next: () => {
        this.fetchDoctors()
        Swal.fire('Deleted', doctor.name, 'success')
      }
    })
  }
}
