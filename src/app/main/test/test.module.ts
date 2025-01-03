import { Routes } from '@angular/router';
import { ExampleDateComponent } from './example-date/example-date.component';

export const dataRoutes: Routes = [
  //  { path: 'none', component:DataTableNoneComponent },
    { path: 'example-date', component:ExampleDateComponent },
];


export class TestRouting {
  static routes = {
    dataRoutes,
  };
}
