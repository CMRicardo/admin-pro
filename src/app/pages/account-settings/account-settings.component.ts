import { Component, OnInit, inject } from '@angular/core'
import { SettingsService } from '@app/services/settings.service'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit {
  private settingsService = inject(SettingsService)

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme()
  }

  public changeTheme(theme: string) {
    this.settingsService.changeTheme(theme)
  }
}
