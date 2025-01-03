import { Routes } from '@angular/router';
import { FirstComponent } from './main/test/first/first.component';
import { SecondComponent } from './main/test/second/second.component';
import { StudentsComponent } from './main/test/students/students.component';
import { DetailsComponent } from './main/home/details/details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AsynchronousComponent  } from './main/test/asynchronous/asynchronous.component';

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
    path: 'asynchronous',
    component: AsynchronousComponent,
    title: 'Asyc'
  },
  {
    path: '',
    loadChildren: () => import('./main/main-routing.module').then(m => m.mainRoutes) // ตรวจสอบว่า mainRoutes ถูกตั้งชื่อถูกต้อง
  },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }
];

export default routeConfig;
