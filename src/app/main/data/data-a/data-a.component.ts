import { Component } from '@angular/core';

@Component({
  selector: 'app-data-a',
  standalone: true,
  imports: [],
  templateUrl: './data-a.component.html',
  styleUrl: './data-a.component.scss'
})
export class DataAComponent {
  constructor() {
    console.log('DataAComponent loaded'); // ใช้ console.log เพื่อตรวจสอบการโหลดคอมโพเนนต์
  }
}
