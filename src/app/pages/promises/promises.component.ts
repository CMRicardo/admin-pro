import { Component } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: ``
})
export class PromisesComponent {
  ngOnInit(): void {
    this.getUsers().then(users => console.log(users))
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data))
    })
  }
}
