import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asynchronous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.scss']
})
export class AsynchronousComponent implements OnInit {
  observableData: any;
  promiseData: any;

  observableTransformedData: any;
  promiseTransformedData: any;

  observableSubscription!: Subscription;

  observableCreation = `
new Observable((observer) => {
  observer.next(123);
});
  `;

  promiseCreation = `
new Promise((resolve, reject) => {
  resolve(123);
});
  `;

  observableTransformation = `
obs.pipe(map((value) => value * 2));
  `;

  promiseTransformation = `
promise.then((value) => value * 2);
  `;

  observableSubscriptionCode = `
sub = obs.subscribe((value) => {
  console.log(value);
});
  `;

  promiseSubscriptionCode = `
promise.then((value) => {
  console.log(value);
});
  `;

  observableUnsubscription = `
sub.unsubscribe();
  `;

  promiseUnsubscription = `
Implied by promise resolution.
  `;

  ngOnInit() {
    this.processAsyn();
  }

  processAsyn() {
    //////////////////////////// creation ////////////////////////////
    // Observable creation
    const obs = new Observable<any>(observer => {
      observer.next(123);
      observer.complete();
    });
    // Promise creation
    const promise = new Promise<any>(resolve => {
      resolve(123);
    });
    promise.then(value => this.promiseData = value);

    // Transforming Observable data
    obs.pipe(map(value => value * 2))
    .subscribe(transformedValue => { this.observableTransformedData = transformedValue; });

    // Transforming Promise data
    promise.then(value => {
      this.promiseTransformedData = value * 2;
    });
    // Subscribing
    this.observableSubscription = obs.subscribe(value => this.observableData = value);
    // Unsubscribing from the observable
    setTimeout(() => {
      this.observableSubscription.unsubscribe();
    }, 3000); // unsubscribe after 3 seconds
  }
}
