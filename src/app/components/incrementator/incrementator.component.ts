import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: ``
})
export class IncrementatorComponent implements OnInit {
  
  @Input('value') public progress: number = 50
  @Input() public btnClass: string = 'btn-primary'
  
  @Output() onChangeValue: EventEmitter<number> = new EventEmitter()
  
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  changeValue(value: number) {
    if (this.progress === 100 && value >= 0) {
      this.onChangeValue.emit(100)
      return this.progress = 100
    }
    if (this.progress === 0 && value < 0) {
      this.onChangeValue.emit(0)
      return this.progress = 0
    }
    this.onChangeValue.emit(this.progress += value)
    return this.progress += value
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100
    } else if(newValue <= 0) {
      this.progress = 0
    } else {
      this.progress = newValue
    }
    console.log({value: this.progress});
    
    this.onChangeValue.emit(newValue)
  }
}
