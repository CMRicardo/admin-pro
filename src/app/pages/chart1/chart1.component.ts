import { Component } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styles: ``
})
export class Chart1Component {
  public labels1 = [
    'Download',
    'In-Store',
    'Mail-Order',
  ];
  public data1 = [100, 200, 50]
}
