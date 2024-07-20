// D:\PROJECT\Angular\AgularDjango\src\app\main\main-routing.module.ts
import { Routes } from '@angular/router';
import { DataModule } from './data/data.module';
import { HomeComponent } from '../home/home.component';
import { DynamicContentComponent } from '../dynamic-content/dynamic-content.component';

export const mainRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'data',
    component: DynamicContentComponent,
    children: DataModule.routes.dataRoutes
  },
  {
    path: 'dataA',
    component: DynamicContentComponent,
    children: DataModule.routes.dataRoutesA
  },
  {
    path: 'dataB',
    component: DynamicContentComponent,
    children: DataModule.routes.dataRoutesB
  }
];
