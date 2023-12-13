import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url:'/' },
        { title: 'Charts', url:'/dashboard/chart-1' },
        { title: 'ProgressBar', url:'/dashboard/progress' },
        { title: 'Promises', url:'/dashboard/promises' },
      ]
    }
  ]

  constructor() { }
}
