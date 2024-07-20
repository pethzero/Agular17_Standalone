// D:\PROJECT\Angular\AgularDjango\src\app\main\data\data-routing.module.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home-main/home.component';
import { HousingLocationComponent } from './housing-location/housing-location.component';

export const dataRoutes: Routes = [
  { path: 'master', component: HomeComponent },
  { path: 'detail', component: HousingLocationComponent }
];


export class HomeRouting {
  static routes = {
    dataRoutes,
  };
}
