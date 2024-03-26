import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { SearchService } from '@app/services/search.service'
import { Doctor } from '@app/models/doctor.model'
import { Hospital } from '@app/models/hospital.model'
import { User } from '@app/models/user.model'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private searchService = inject(SearchService)

  public users: User[] = []
  public doctors: Doctor[] = []
  public hospitals: Hospital[] = []

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({ query }) => this.globalSearch(query)
    })
  }

  private globalSearch(query: string) {
    this.searchService.globalSearch(query).subscribe({
      next: res => {
        this.users = res.users
        this.doctors = res.doctors
        this.hospitals = res.hospitals
      }
    })
  }
}
