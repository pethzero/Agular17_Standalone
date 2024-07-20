import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  

  // private apiUrl = 'YOUR_API_URL'; // กำหนด URL ของ API ของคุณที่นี่

  constructor(private http: HttpClient, private coreService: CoreService) { }

  // Create
  SystemCreateSQL(data: any,queryid:any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    if(apiUrl) {
      return this.http.post<any>(apiUrl, data, this.httpOptions);
    } else {
      throw new Error('API URL not found for the provided data.');
    }
    
  }

  SystemReadSQL(queryid:any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    if(apiUrl) {
      return this.http.get<any>(apiUrl);
    } else {
      throw new Error('API URL not found for the provided data.');
    }
  }

  SystemUpdateSQL(id: number, data: any,queryid:any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    return this.http.put<any>(`${apiUrl}${id}/`, data, this.httpOptions);
  }

  SystemPatchSQL(id: number, data: any,queryid:any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    return this.http.patch<any>(`${apiUrl}${id}`, data, this.httpOptions);
  }

  SystemDeleteSQL(id: number, queryid:any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    return this.http.delete<any>(`${apiUrl}${id}`);
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // createDjango(data: any): Observable<any> {
  //   return this.http.post<any>(`http://127.0.0.1:8000/student_restapi`, data, this.httpOptions);
  // }
  // Read
  readDjango(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/student_restapi`);
  }
  // // Update
  // update(id: number, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/endpoint/${id}`, data);
  // }

  // // Delete
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/endpoint/${id}`);
  // }
}
