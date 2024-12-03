// D:\PROJECT\Angular\AgularDjango\src\app\main\main-routing.module.ts
import { Routes } from '@angular/router';
import { DataRouting } from './data/data.module';
import { HomeRouting } from './home/home.module';
import { MainComponent } from './main.component';
import { DynamicContentComponent } from './dynamic-content.component';
import { DataAPIRouting } from './data-api/data-api.module';

export const mainRoutes: Routes = [
  // { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '', pathMatch: 'full', component: MainComponent },
  {
    path: 'data',
    component: DynamicContentComponent,
    children: DataRouting.routes.dataRoutes
  },
  {
    path: 'dataA',
    component: DynamicContentComponent,
    children: DataRouting.routes.dataRoutesA
  },
  {
    path: 'dataB',
    component: DynamicContentComponent,
    children: DataRouting.routes.dataRoutesB
  },
  {
    path: 'home',
    component: DynamicContentComponent,
    children: HomeRouting.routes.dataRoutes
  },
  {
    path: 'api-test',
    component: DynamicContentComponent,
    children: DataTableRouting.routes.dataRoutes
  },
];
