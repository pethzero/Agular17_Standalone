import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private query = [
    { data: 'ST0001', link: 'http://localhost:3000/api/students/' },
    { data: 'ST0002', link: 'http://127.0.0.1:8000/myapp/crud_student/' }
  ];

  constructor() {
   }

   QuerySearch(data: string): string | undefined {
    const selectedQuery = this.query.find(item => item.data === data);
    return selectedQuery ? selectedQuery.link : undefined;
  }

}
