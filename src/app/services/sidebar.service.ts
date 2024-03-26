import { Injectable } from '@angular/core'
import { SidebarMenuItem } from '@app/interfaces/sidebar-menu.interface'

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu?: SidebarMenuItem[]

  public loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '[]')
  }
}
