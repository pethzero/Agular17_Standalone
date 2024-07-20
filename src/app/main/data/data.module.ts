// D:\PROJECT\Angular\AgularDjango\src\app\main\data\data-routing.module.ts
import { Routes } from '@angular/router';
import { DataAComponent } from './data-a/data-a.component';
import { DataBComponent } from './data-b/data-b.component';

export const dataRoutes: Routes = [
  { path: 'aaa', component: DataAComponent },
  { path: 'bbb', component: DataBComponent }
];

export const dataRoutesA: Routes = [
  { path: 'aaa', component: DataBComponent },
];

export const dataRoutesB: Routes = [
  { path: 'bbb', component: DataAComponent },
];

export class DataRouting {
  static routes = {
    dataRoutes,
    dataRoutesA,
    dataRoutesB
  };
}
