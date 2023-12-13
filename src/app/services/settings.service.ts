import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme')

  

  constructor() {
    const theme = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'
    this.linkTheme?.setAttribute('href', theme)
  }

  public changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkCurrentTheme()
  }

  public checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach(link => {
      link.classList.remove('working')
      const btnTheme = link.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href')
      if (btnThemeUrl === currentTheme) {
        link.classList.add('working')
      }
    })
  }
}
