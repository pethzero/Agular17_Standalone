import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreService } from './core.service';

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
  // SystemCreateSQL(data: any,queryid:any): Observable<any> {
  //   const apiUrl = this.coreService.QuerySearch(queryid);
  //   if(apiUrl) {
  //     return this.http.post<any>(apiUrl, data, this.httpOptions);
  //   } else {
  //     throw new Error('API URL not found for the provided data.');
  //   }
  // }

  

  // SystemReadSQL(queryid:any): Observable<any> {
  //   const apiUrl = this.coreService.QuerySearch(queryid);
  //   if(apiUrl) {
  //     return this.http.get<any>(apiUrl);
  //   } else {
  //     throw new Error('API URL not found for the provided data.');
  //   }
  // }

  // SystemUpdateSQL(id: number, data: any,queryid:any): Observable<any> {
  //   const apiUrl = this.coreService.QuerySearch(queryid);
  //   return this.http.put<any>(`${apiUrl}${id}/`, data, this.httpOptions);
  // }

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

  ///////////////////////////////////////////  NEW ////////////////////////////////////////////////////
  // SystemReadSQL(queryid: any): Observable<any> {
  //   const apiUrl = this.coreService.QuerySearch(queryid);

  //   if (!apiUrl) {
  //     // Return an Observable with an error message if the URL is not found
  //     return of(new Error('API URL not found for the provided data.'));
  //   }

  //   // Use the HttpClient to make the request and handle errors
  //   return this.http.get<any>(apiUrl).pipe(
  //     catchError(error => {
  //       console.error('API request error:', error);
  //       // Return an empty observable or a default value in case of an error
  //       return of(null); // Adjust based on expected response
  //     })
  //   );
  // }

  SystemReadSQL(queryid: any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);
    if (apiUrl) {
      return this.http.get<any>(apiUrl).pipe(
        catchError(this.handleError<any>('SystemReadSQL', []))
      );
    } else {
      return of([]); // Return an empty observable if URL not found
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
  SystemCreateSQL(data: any, queryid: any): Observable<any> {
    const apiUrl = this.coreService.QuerySearch(queryid);

    if (apiUrl) {
      return this.http.post<any>(apiUrl, data, this.httpOptions).pipe(
        catchError(this.handleErrorLog)
      );
    } else {
      return observableThrowError(() => new Error('API URL not found for the provided data.'));
    }
  }

  private handleErrorLog(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Backend returned code ${error.status}, ` +
                     `body was: ${error.error}`;
    }

    // Log the error to the console or send it to a remote logging infrastructure
    console.error(errorMessage);

    // Return an observable with a user-facing error message
    return observableThrowError(() => new Error('Something went wrong; please try again later.'));
  }

SystemUpdateSQL(id: number, data: any,queryid:any): Observable<any> {
  const apiUrl = this.coreService.QuerySearch(queryid);
  if (apiUrl) {
    return this.http.put<any>(`${apiUrl}${id}/`, data, this.httpOptions);
  }
  else {
    throw new Error('API URL not found for the provided data.');
  }
}


}
