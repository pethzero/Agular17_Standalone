import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ApiService } from '../../../api/api.service';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-data-api-upload',
  standalone: true,
  imports: [],
  templateUrl: './data-api-upload.component.html',
  styleUrl: './data-api-upload.component.scss'
})
export class DataApiUploadComponent {

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  // ตัวแปรสำหรับเก็บไฟล์
  fileToUpload_single: File | null = null; // Single File
  fileToUpload_mutiple: File[] = []; // Multiple Files
  fileName_single: string = ''; // ชื่อไฟล์ของ fileInput1
  fileNames_mutiple: string[] = []; // ชื่อไฟล์ทั้งหมดของ fileInput2
  upload_mode: number = 0; // สถานะอัปโหลด

  // ดึง DOM Element
  @ViewChild('fileInput1') fileInput1!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;

  // ฟังก์ชันจัดการไฟล์เมื่อเปลี่ยนค่าใน Input
  handleFileInput(event: Event, mode: number): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files) {
      const files: FileList = inputElement.files;
      console.log('Selected Files:', files);

      const maxSize = 10 * 1024 * 1024; // Maximum file size (10MB)
      this.validateFile(files, maxSize, mode).subscribe({
        next: () => {
          if (mode === 1 && files) {
            // For Single File
            this.fileToUpload_single = files.item(0);
            this.fileName_single = this.fileToUpload_single ? this.fileToUpload_single.name : 'Choose a single file';
            this.upload_mode = 2;
          } else if (mode === 2 && files) {
            // For Multiple Files
            this.fileToUpload_mutiple = Array.from(files);
            this.fileNames_mutiple = this.fileToUpload_mutiple.map(file => file.name);
          }
        },
        error: (error) => {
          this.upload_mode = 0;
          this.handleFileError(error);

          // Clear file input field on error
          if (mode === 1) {
            this.fileInput1.nativeElement.value = ''; // Clear single file input
          } else if (mode === 2) {
            this.fileInput2.nativeElement.value = ''; // Clear multiple file input
          }
        },
        complete: () => {
          console.log('Validation completed successfully.');
        }
      });
    } else {
      console.error('No files found in the input element.');
    }
  }



  // ฟังก์ชันลบไฟล์
  fileremove(mode: number): void {
    if (mode === 1) {
      this.fileToUpload_single = null;
      this.fileName_single = 'Choose a single file';
      this.upload_mode = 3;
      this.fileInput1.nativeElement.value = ''; // รีเซ็ตค่า input
    } else if (mode === 2) {
      this.fileToUpload_mutiple = [];
      this.fileNames_mutiple = [];
      this.fileInput2.nativeElement.value = ''; // รีเซ็ตค่า input
    }
  }

  // ฟังก์ชันตรวจสอบว่าไฟล์มีค่าหรือไม่
  checkFile(mode: number): void {
    if (mode === 1) {
      console.log('File 1:', this.fileToUpload_single || 'No file selected');
    } else if (mode === 2) {
      console.log('File 2:', this.fileToUpload_mutiple.length > 0 ? this.fileToUpload_mutiple : 'No files selected');
    }
  }

  // ฟังก์ชันแจ้งเตือนและตรวจสอบไฟล์
  validateFile(files: FileList | null, maxSize: number, mode: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const allowedTypes = mode === 1
        ? ['image/jpeg', 'image/png']
        : ['image/jpeg', 'image/png', 'application/pdf'];

      if (files && files.length > 0) {
        const invalidFiles = Array.from(files).filter(file =>
          !allowedTypes.includes(file.type) || file.size > maxSize
        );

        if (invalidFiles.length > 0) {
          const errorType = !allowedTypes.includes(invalidFiles[0].type) ? 1 : 2;
          observer.error(errorType);
        } else if (Array.from(files).some(file => file.name.length > 125)) {
          observer.error(3);
        } else {
          observer.next(true);
          observer.complete();
        }
      } else {
        observer.error('No files uploaded');
      }
    });
  }

  // ฟังก์ชันจัดการ Error
  handleFileError(error: number | string): void {
    let message_error = '';
    switch (error) {
      case 1:
        message_error = 'Invalid file type specified.';
        break;
      case 2:
        message_error = 'File size exceeds the 10MB limit.';
        break;
      case 3:
        message_error = 'File name exceeds 125 characters.';
        break;
      default:
        message_error = 'No file uploaded or unknown error.';
    }
    Swal.fire('Error!', message_error, 'error');
  }


  // api_upload() {
  //   this.apiService.sys_api_upload().subscribe({
  //     next: (result) => {
  //       console.log(result);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
}
