import { Component, OnInit, inject } from '@angular/core'
import { SettingsService } from '../services/settings.service'
import { SidebarService } from '@app/services/sidebar.service'

declare function customInit(): void

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {
  private settingsService = inject(SettingsService)
  private sidebarService = inject(SidebarService)

  ngOnInit(): void {
    customInit()
    this.sidebarService.loadMenu()
    console.log(this.sidebarService.menu)
  }
}
