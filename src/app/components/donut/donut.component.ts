import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: ``
})
export class DonutComponent implements OnInit {
  @Input() title: string = 'No title'

  // Doughnut
  @Input({ required: true }) public labels: string[] = [
    'Download',
    'In-Store',
    'Mail-Order',
  ]
  @Input({ required: true }) public data: number[] = [100, 200, 50]

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData.labels = this.labels
    // datasets it's an array, so we need to access the first item
    this.doughnutChartData.datasets[0].data = this.data
  }

}
