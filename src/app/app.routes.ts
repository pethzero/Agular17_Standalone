import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { StudentsComponent } from './students/students.component';
import { DetailsComponent } from './details/details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routeConfig: Routes = [
  {
    path: 'first-component',
    component: FirstComponent,
    title: 'Test Page1'
  },
  {
    path: 'second-component',
    component: SecondComponent,
    title: 'Test Page2'
  },
  {
    path: 'students',
    component: StudentsComponent,
    title: 'Students Table'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'select',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: '',
    loadChildren: () => import('./main/main-routing.module').then(m => m.mainRoutes) // ตรวจสอบว่า mainRoutes ถูกตั้งชื่อถูกต้อง
  },
  // { path: '', pathMatch: 'full', component: HomeComponent },
  // {path: 'main', loadChildren: () => import('./main/main-routing.module').then(m => m.mainRoutes) },
  //  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }
];

export default routeConfig;
