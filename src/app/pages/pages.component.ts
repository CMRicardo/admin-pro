import { Component, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInit(): void

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent {
  private settingsService = inject(SettingsService)
  ngOnInit(): void {
    customInit()
  }
}
