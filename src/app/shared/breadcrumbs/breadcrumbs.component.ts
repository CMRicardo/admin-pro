import { Component, OnDestroy, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy {
  private router = inject(Router)
  
  public title: string = ''
  public titleSubscription: Subscription

  constructor () {
    this.titleSubscription = this.getRouteArguments()
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe()
  }

  getRouteArguments() {
    return this.router.events
    .pipe(
      filter(
        event => event instanceof ActivationEnd &&
        event.snapshot.firstChild === null
      ),
      map(event => {
        const evt = event as ActivationEnd
        return evt.snapshot.data
      })
    )
    .subscribe({
      next: ({title}) => {
        this.title = title
        document.title = title
      }
    })
  }
}
