
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit {
  private dataSubscription!: Subscription;

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    // this.apiService.SystemReadSQL('ST001').subscribe((data) => {
    //   console.log(data); // console.log ค่าที่ได้จากการเรียก this.apiService.read()
    // });
    this.GetData().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  }

  GetData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.SystemReadSQL('ST001').subscribe(
        (data) => {
          resolve(data); // ส่งค่าที่ได้รับกลับไปใน resolve เมื่อเรียก API สำเร็จ
        },
        (error) => {
          reject(error); // ส่งข้อผิดพลาดกลับไปใน reject เมื่อเกิดข้อผิดพลาดในการเรียก API
        }
      );
    });
  }




  add_data() {
    // const data = {
    //   "name": "Thanadol 555",
    // };
    // this.apiService.SystemCreateSQL(JSON.stringify(data)).subscribe(response => {
    //   console.log('Data created successfully:', response);
    // }, error => {
    //   console.error('Error creating data:', error);
    // });
  }

  update_data() {
    // const data = {
    //   "name": "Thanadol 555",
    // };
    // this.apiService.SystemCreateSQL(JSON.stringify(data)).subscribe(response => {
    //   console.log('Data created successfully:', response);
    // }, error => {
    //   console.error('Error creating data:', error);
    // });
  }


  delete_data() {
    // const data = {
    //   "name": "Thanadol 555",
    // };
    // this.apiService.SystemCreateSQL(JSON.stringify(data)).subscribe(response => {
    //   console.log('Data created successfully:', response);
    // }, error => {
    //   console.error('Error creating data:', error);
    // });
  }


  ngOnDestroy() {
    // Unsubscribe เมื่อ Component ถูกทำลายเพื่อป้องกัน memory leaks
    this.dataSubscription.unsubscribe();
  }

}