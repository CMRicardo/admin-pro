import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: ``
})
export class IncrementatorComponent implements OnInit {
  @Input() public value: number = 50
  @Input() public btnClass: string = 'btn-primary'

  @Output() ChangedValue: EventEmitter<number> = new EventEmitter()

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  changeValue(value: number) {
    if (this.value === 100 && value >= 0) {
      this.ChangedValue.emit(100)
      return (this.value = 100)
    }
    if (this.value === 0 && value < 0) {
      this.ChangedValue.emit(0)
      return (this.value = 0)
    }
    this.ChangedValue.emit((this.value += value))
    return (this.value += value)
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.value = 100
    } else if (newValue <= 0) {
      this.value = 0
    } else {
      this.value = newValue
    }

    this.ChangedValue.emit(newValue)
  }
}
