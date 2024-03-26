import { Component, OnDestroy } from '@angular/core'
import { Observable, Subscription, filter, interval, map } from 'rxjs'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {
  public intervalDesuscription: Subscription
  constructor() {
    this.intervalDesuscription = this.returnsInterval().subscribe({
      next: console.log
    })
  }
  ngOnDestroy(): void {
    this.intervalDesuscription.unsubscribe()
  }

  public returnsInterval(): Observable<number> {
    return interval(500).pipe(
      map(value => 1 + value),
      filter(value => value % 2 === 0)
    )
  }

  public returnsObservable(): Observable<number> {
    let i = 0
    return new Observable<number>(observable => {
      const interval = setInterval((): void => {
        i++
        observable.next(i)
        if (i === 4) {
          clearInterval(interval)
          observable.complete()
        }
        if (i === 2) {
          observable.error('i know equals 2')
        }
      }, 1000)
    })
  }
}
