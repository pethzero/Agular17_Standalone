import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

export interface DataTable {
  id: number;
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

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  
  ngOnInit(): void {
    // console.log(this.ipaddr)
    this.ipaddr = 'ST0002'; // ตั้งค่าเริ่มต้นให้เป็น 'ST0001' หรือค่าอื่น ๆ ตามที่ต้องการ
    // this.select_db = 'ฐาน Node.JS';
    this.select_db = 'ฐาน Django';
    this.GetData().then((data) => {
      this.list_student = data;
    }).catch((error) => {
      console.error('An error occurred:', error);
    });


 

  }

  dbSelect(data:string): void {
    switch(data) {
      case 'ST0001':
        this.select_db = 'ฐาน Node.JS';
        this.GetData().then((data) => {
          this.list_student = data;
        }).catch((error) => {
          console.error('An error occurred:', error);
        });

        break;
      case 'ST0002':
        this.select_db = 'ฐาน Django';
        this.GetData().then((data) => {
          this.list_student = data;
        }).catch((error) => {
          console.error('An error occurred:', error);
        });
        
        break;
      default:
        this.select_db = 'Data is not recognized';
    }
  }

  GetData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.SystemReadSQL(this.ipaddr).subscribe(
        (data) => {
          resolve(data); // ส่งค่าที่ได้รับกลับไปใน resolve เมื่อเรียก API สำเร็จ
        },
        (error) => {
          reject(error); // ส่งข้อผิดพลาดกลับไปใน reject เมื่อเกิดข้อผิดพลาดในการเรียก API
        }
      );
    });
  }


  async AddData(): Promise<void> {
    try {
      this.formData = {
        name: this.data_name,
        detail: this.data_detail
      };
      const result = await this.apiService.SystemCreateSQL(JSON.stringify(this.formData), this.ipaddr).toPromise();
      console.log(result)

      if(result.status == false){
        Swal.fire({
          title: "Error Data",
          text: result.message,
          icon: "error"
        });
      }
      else{
      const newData = {
        id: result.id, // สร้าง id ใหม่โดยให้เพิ่มไปเรื่อย ๆ จากขนาดของ list_student
        name: result.name,
        detail: result.detail
      };

      // // เพิ่มข้อมูลใหม่ลงในคอลเลกชัน list_student
      this.list_student.push(newData);

      // // เคลียร์ค่าที่ใช้ในการเพิ่มข้อมูล
      this.data_name = '';
      this.data_detail = '';

      }
      ///////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////
      ////// กรณี Refresh GetData ใหม่
      // await this.GetData().then((data) => {
      //   this.list_student = data;
      //   this.data_name = '';
      //   this.data_detail = '';
      // }).catch((error) => {
      //   console.error('An error occurred:', error);
      // });
      console.log('Data Add Suscessfully:', result);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  changemodeAction(data: DataTable): void {
    data.editing = true;
  }

  async upadteAction(data: DataTable): Promise<void> {
    try {
      this.formData = {
        name: data.name,
        detail: data.detail
      };
      const result = await this.apiService.SystemUpdateSQL(data.id, JSON.stringify(this.formData), this.ipaddr).toPromise();
      // const result = await this.apiService.SystemPatchSQL(data.id, JSON.stringify(this.formData), this.ipaddr).toPromise();
      data.editing = false;
      console.log('UpDate Data:', result);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }


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

      // await this.GetData().then((data) => {
      //   this.list_student = data;
      // }).catch((error) => {
      //   console.error('An error occurred:', error);
      // });

      console.log('UpDate Data:', result);
    } else {
      console.log('User canceled deletion.');
    }
  }


  cancelAction(data: DataTable): void {
    data.editing = false;
  }

  trackByData(index: number, data: any): number {
    return data.id;
  }

}
