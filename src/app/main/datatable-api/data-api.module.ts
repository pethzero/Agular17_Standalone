
import { Routes } from '@angular/router';
import { DataTableNoneComponent } from './data-table-none/data-table-none.component';
import { DataTableApiComponent } from './data-table-api/data-table-api.component';
import { DataTablePivotComponent } from './data-table-pivot/data-table-pivot.component';

export const dataRoutes: Routes = [
  { path: 'none', component:DataTableNoneComponent },
  { path: 'pivot', component:DataTablePivotComponent },
  { path: 'api', component:DataTableApiComponent}
];


export class DataTableRouting {
  static routes = {
    dataRoutes,
  };
}
