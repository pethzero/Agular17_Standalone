import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
// import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface DataTable {
  id: any;
  name: string;
  score: string;
  detail: string;
  editing?: boolean;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  list_student: any[] = [];
  formData: any = {
    name: '',
    detail: ''
  };
  data_name: string = '';
  data_detail: string = '';
  @Input() actionGetValue: string = '';
  @Input() actionPostValue: string = '';

  list_ipaddr: string[] = ['ST0001', 'ST0002'];
  ipaddr: string = ''; // กำหนดค่าเริ่มต้นให้เป็น 'ST0001'
  select_db: string = '';
  isLoading: boolean = false; // Optional: For loading state
  error: string | null = null; // Define a variable to store error messages

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    // console.log(this.ipaddr)
    this.ipaddr = 'ST0001'; // ตั้งค่าเริ่มต้นให้เป็น 'ST0001' หรือค่าอื่น ๆ ตามที่ต้องการ
    // this.select_db = 'ฐาน Node.JS';
    this.select_db = 'ฐาน Node';

    this.getStudentObservable(0, null,null).subscribe({
      next: (result) => {
        console.log(result)
        this.list_student = result; // Handle the result data
        this.test();
      },
      error: (err) => {
        this.error = 'Failed to fetch data'; // Handle the error
        console.error('Failed to fetch data', err);
      }
    });; // Call the fetchStudents method on initialization
  }

  // getStudentObservable(mode =0,data=null): Observable<any> {
  //   let send_api: Observable<any>;
  //   switch (mode) {
  //     case 0:
  //       send_api = this.apiService.SystemReadSQL(this.ipaddr);
  //       break;
  //     case 1:
  //       send_api = this.apiService.SystemCreateSQL(data, this.ipaddr);
  //       break;
  //     default:
  //       send_api = of(null); // Use of(null) to return an Observable with a null value
  //       break;
  //   }
  //   return send_api;
  // }

  getStudentObservable(mode: number = 0, data: any = null,id:any=null): Observable<any> {
    let send_api: Observable<any>;
    if (mode === 0) {
      send_api = this.apiService.SystemReadSQL(this.ipaddr);
    } else if (mode === 1) {
      send_api = this.apiService.SystemCreateSQL(data, this.ipaddr);
    } else if (mode === 2) {
      send_api = this.apiService.SystemUpdateSQL(id,data, this.ipaddr);
    } else if (mode === 2) {
      send_api = this.apiService.SystemUpdateSQL(id,data, this.ipaddr);
    }
    else {
      send_api = of(null); // Use of(null) to return an Observable with a null value
    }
    return send_api;
  }




  nextmessageA() {
    console.log('Node')
  }
  nextmessageB() {
    console.log('Danjo')
  }

  getDataPipe(): void {
    this.isLoading = true; // Start loading
    this.apiService.SystemReadSQL(this.ipaddr)
      .pipe(
        tap(data => {
          this.list_student = data;
        }),
        catchError(error => {
          console.error('An error occurred:', error);
          // Handle the error (e.g., show a notification to the user)
          return of([]); // Return an empty array in case of error
        }),
        finalize(() => {
          this.isLoading = false; // End loading
        })
      )
      .subscribe(); // Subscription is empty if all logic is handled in pipe
  }





  //////////////////////////////////////////////////////// OLD CODE ////////////////////////////////////////////////////////
  dbSelect(data: string): void {
    switch (data) {
      case 'ST0001':
        this.select_db = 'ฐาน Node.JS';
        this.getStudentObservable(0).subscribe({
          next: (result) => {
            this.list_student = result; // Handle the result data
            this.nextmessageA(); // Call your next message function here
          },
          error: (err) => {
            this.error = 'Failed to fetch data'; // Handle the error
            console.error('Failed to fetch data', err);
          }
        });; // Call the fetchStudents method on initialization

        break;
      case 'ST0002':
        this.select_db = 'ฐาน Django';
        this.getStudentObservable(0).subscribe({
          next: (result) => {
            this.list_student = result; // Handle the result data
            this.nextmessageB(); // Call your next message function here
          },
          error: (err) => {
            this.error = 'Failed to fetch data'; // Handle the error
            console.error('Failed to fetch data', err);
          }
        });; // Call the fetchStudents method on initialization
        break;
      default:
        this.select_db = 'Data is not recognized';
    }
  }


  AddData() {
    try {
      this.formData = {
        name: this.data_name,
        detail: this.data_detail
      };

      this.getStudentObservable(1, JSON.stringify(this.formData)).subscribe({
        next: (result) => {
          console.log('AAA', result)
          if (result.status == false) {
            Swal.fire({
              title: "Error Data",
              text: result.message,
              icon: "error"
            });
          } else {

            this.getStudentObservable(0, null).subscribe({
              next: (result) => {
                console.log('Loading When Add Data');
                this.list_student = result; // Handle the result data
                this.data_name = '';
                this.data_detail = '';
              },
              error: (err) => {
                this.error = 'Failed to fetch data'; // Handle the error
                console.error('Failed to fetch data', err);
              }
            });; // Call the fetchStudents method on initialization

            //// IF NOT GET API
            // const newData = {
            //     id: result.id, // Assuming result.id is available
            //     name: result.name,
            //     detail: result.detail
            // };

            // // Add new data to list_student
            // this.list_student.push(newData);
            // // Clear input fields
            // this.data_name = '';
            // this.data_detail = '';
          }
        },
        error: (err) => {
          this.error = 'Failed to fetch data'; // Handle the error
          console.error('Failed to fetch data', err);
        }
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }


  changemodeAction(data: DataTable): void {
    data.editing = true;
  }


  upadteAction(data: DataTable) {
    try {
      this.formData = {
        name: data.name,
        detail: data.detail
      };

      this.getStudentObservable(2, JSON.stringify(this.formData),data.id).subscribe({
        next: (result) => {
          if (result.status == false) {
            Swal.fire({
              title: "Error Data",
              text: result.message,
              icon: "error"
            });
          } else {

            this.getStudentObservable(0, null).subscribe({
              next: (result) => {
                console.log('Loading When Update Data');
                this.list_student = result; // Handle the result data
                this.data_name = '';
                this.data_detail = '';
              },
              error: (err) => {
                this.error = 'Failed to fetch data'; // Handle the error
                console.error('Failed to fetch data', err);
              }
            });; // Call the fetchStudents method on initialization

            //// IF NOT GET API
            // data.editing = false;
          }
        },
        error: (err) => {
          this.error = 'Failed to fetch data'; // Handle the error
          console.error('Failed to fetch data', err);
        }
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }


  // async upadteAction(data: DataTable): Promise<void> {
  //   try {
  //     this.formData = {
  //       name: data.name,
  //       detail: data.detail
  //     };
  //     const result = await this.apiService.SystemUpdateSQL(data.id, JSON.stringify(this.formData), this.ipaddr).toPromise();
  //     // const result = await this.apiService.SystemPatchSQL(data.id, JSON.stringify(this.formData), this.ipaddr).toPromise();
  //     data.editing = false;
  //     console.log('UpDate Data:', result);
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // }


  async deleteAction(data: DataTable): Promise<void> {
    console.log(data)
    // const DataID = resdata.id;
    const userConfirmed = window.confirm('คุณแน่ใจใช่ไหม?');
    if (userConfirmed) {
      const result = await this.apiService.SystemDeleteSQL(data.id, this.ipaddr).toPromise();
      // หากการลบสำเร็จ ให้ลบข้อมูลออกจากคอลเลกชัน list_student โดยใช้ filter
      if (result) {
        this.list_student = this.list_student.filter(student => student.id !== data.id);
        console.log('Data deleted successfully:', result);
      } else {
        console.log('Failed to delete data.');
      }
      console.log('UpDate Data:', result);
    } else {
      console.log('User canceled deletion.');
    }
  }


  cancelAction(data: DataTable): void {
    data.editing = false;
  }


  test() {
    this.getStudentObservable(99, null).subscribe({
      next: (result) => {
        console.log('A');
        if (result) {
          console.log('C', result);
        } else {
          console.warn('No data returned for mode 3');
        }
      },
      error: (err) => {
        this.error = 'Failed to fetch data'; // Handle the error
        console.error('Failed to fetch data', err);
      }
    });
  }
}
