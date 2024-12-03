import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class DataJsonService {
  private jsonUrl = 'assets/json/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Method to get JSON data from file
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  // Method to get a specific item by ID
  getDataById(id: number): Observable<any> {
    return this.getData().pipe(
      map(items => items.find(item => item.id === id))
    );
  }
}
