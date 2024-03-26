import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'

import { Hospital } from '@app/models/hospital.model'
import { HospitalsService } from '@app/services/hospitals.service'
import { ImageModalService } from '@app/services/image-modal.service'
import { SearchService } from '@app/services/search.service'

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit, OnDestroy {
  private hospitalsService = inject(HospitalsService)
  private imageModalService = inject(ImageModalService)
  private searchService = inject(SearchService)

  public imgSubscription?: Subscription
  public hospitals: Hospital[] = []
  public hospitalsTemp: Hospital[] = []
  public isLoading: boolean = true

  ngOnInit(): void {
    this.fetchHospitals()
    this.imgSubscription = this.imageModalService.newImage.subscribe({
      next: () => this.fetchHospitals()
    })
  }
  ngOnDestroy(): void {
    this.imgSubscription?.unsubscribe()
  }

  private fetchHospitals() {
    this.isLoading = true
    this.hospitalsService.fetchHospitals().subscribe({
      next: hospitals => {
        this.hospitals = hospitals
        this.hospitalsTemp = hospitals
        this.isLoading = false
      }
    })
  }

  public saveChanges(hospital: Hospital) {
    if (!hospital.id) return
    this.hospitalsService.updateHospital(hospital.id, hospital.name).subscribe({
      next: () => {
        Swal.fire('Updated', hospital.name, 'success')
      }
    })
  }
  public deleteHospital(hospital: Hospital) {
    if (!hospital.id) return
    this.hospitalsService.deleteHospital(hospital.id).subscribe({
      next: () => {
        this.fetchHospitals()
        Swal.fire('Deleted', hospital.name, 'success')
      }
    })
  }

  public search(query: string) {
    if (query.length === 0) {
      this.hospitals = this.hospitalsTemp
      return
    }
    this.searchService.search('hospitals', query).subscribe({
      next: hospitals => (this.hospitals = hospitals)
    })
  }

  public async openSwal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'New Hospital',
      text: 'Enter the new hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital',
      showCancelButton: true
    })

    if (value.trim().length > 0) {
      this.hospitalsService.createHospital(value).subscribe({
        next: res => {
          this.hospitals.push(res.hospital)
          Swal.fire({
            timer: 1500,
            title: 'Hospital Created',
            html: 'New hospital created',
            icon: 'success',
            showConfirmButton: false,
            toast: true,
            position: 'top-right'
          })
        }
      })
    }
  }

  public openModal(hospital: Hospital) {
    if (!hospital.id) return
    this.imageModalService.openModal('hospitals', hospital.id, hospital.img)
  }
}
