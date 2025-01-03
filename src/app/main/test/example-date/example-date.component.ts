import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule here

@Component({
  selector: 'app-example-date',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule here
  templateUrl: './example-date.component.html',
  styleUrls: ['./example-date.component.scss'],
})
export class ExampleDateComponent {
  formatter = new DateFormatter();
  currentDateTime: string;

  input_formattedDate: string | null = null;
  input_formattedTime: string | null = null;

  out_formattedDate: string | null = null;
  out_formattedTime: string | null = null;
  out_formattedDateTime: string | null = null;

  dateDisplayMode: string = 'YYYY-MM-DD'; // Default format

  check_date: boolean | null = null;
  select_date: string | null = null;

  commonFormats = [
    'YYYY-MM-DD',
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'MMM DD, YYYY', // e.g., Dec 28, 2024
    'DD MMM YYYY',  // e.g., 28 Dec 2024
  ];

  constructor() {
    this.currentDateTime = this.formatter.getCurrentDateTime();
  }

  updateFormattedDate(): void {
    const rawDate = this.formatter.processDateInput(this.input_formattedDate || '');
    if(rawDate){
      this.out_formattedDate = rawDate
      this.select_date = rawDate
      this.check_date = true;
    }else{
      this.out_formattedDate = 'Invalid Date';
      this.check_date = false;
    }
  }

  updateFormattedTime(event: Event): void {
    this.out_formattedTime = this.formatter.formatTime(this.input_formattedTime || '');
  }

  combineDateTime(): void {
    if (this.out_formattedDate && this.out_formattedTime) {
       this.out_formattedDateTime = `${this.out_formattedDate} ${this.out_formattedTime}`;
    } else {
       this.out_formattedDateTime = 'Invalid combination';
    }
  }

  formatDisplayTime(){

    if (this.out_formattedDate && this.out_formattedTime) 
    {
      this.out_formattedDateTime = `${this.out_formattedDate} ${this.out_formattedTime}`;
    } else {
      this.out_formattedDateTime = 'Not Set';
    }
    return this.out_formattedDateTime
  }

  updateCurrentDateTime(): void {
    this.currentDateTime = this.formatter.getCurrentDateTime();
  }

  changeDisplayMode(event: Event): void {
    const target = event.target as HTMLSelectElement; // Explicitly cast to HTMLSelectElement
    const mode = target.value; // Access the value safely
    this.dateDisplayMode = mode;
    if (this.check_date) {
      const rawDate = this.select_date || ''
      this.out_formattedDate = this.formatter.formatToDisplayMode(rawDate, mode);
    }
  }
}

class DateFormatter {
  public processDateInput(dateStr: string): string | null {
    const ddMmYyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (ddMmYyyyRegex.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // ใช้ local time zone
      // ตรวจสอบว่ามีการเกิดการปรับวันที่หรือไม่
      if (date.getDate() !== parseInt(day) || date.getMonth() !== parseInt(month) - 1 || date.getFullYear() !== parseInt(year)) {
        return null;  // ถ้าบวกวัน/เดือนผิดก็ถือว่าไม่ถูกต้อง
      }
      return `${year}-${month}-${day}`;
    } else if (yyyyMmDdRegex.test(dateStr)) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day); // ใช้ local time zone
      // ตรวจสอบว่ามีการเกิดการปรับวันที่หรือไม่
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return null;  // ถ้าบวกวัน/เดือนผิดก็ถือว่าไม่ถูกต้อง
      }
      return dateStr;  // คืนค่าวันที่เดิมถ้าถูกต้อง
    }
    return null;  // คืนค่า null ถ้าไม่ใช่รูปแบบที่ถูกต้อง
  }
  

  public formatToDisplayMode(dateStr: string, mode: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // ใช้ local time zone
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
  
    switch (mode) {
      case 'YYYY-MM-DD':
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      case 'DD/MM/YYYY':
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
      case 'MM/DD/YYYY':
        return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
      case 'MMM DD, YYYY':
        return `${monthNames[month - 1]} ${String(day).padStart(2, '0')}, ${year}`;
      case 'DD MMM YYYY':
        return `${String(day).padStart(2, '0')} ${monthNames[month - 1]} ${year}`;
      default:
        return 'Invalid Format';
    }
  }
  public formatTime(timeStr: string): string | null {
    const [hour, minute] = timeStr.split(':');
    if (hour && minute) {
      return `${hour}:${minute}:00`;
    }
    return 'Invalid Time';
  }

  public getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0];
  }


}
