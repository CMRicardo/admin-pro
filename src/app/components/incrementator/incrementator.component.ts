import { Component } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: ``
})
export class IncrementatorComponent {
  public progress: number = 50

  get percentage() {
    return `${this.progress}%`
  }

  changeValue(value: number) {
    if (this.progress === 100 && value >= 0) {
      return this.progress = 100
    }
    if (this.progress === 0 && value < 0) {
      return this.progress = 0
    }
    return this.progress += value
  }
}
