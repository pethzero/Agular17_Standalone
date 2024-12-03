import { Component, OnInit } from '@angular/core';
import { DataJsonService } from '../../../api/data-json.service';
import { of,from  } from 'rxjs';
import { map, filter,reduce  } from 'rxjs/operators';

@Component({
  selector: 'app-data-observable',
  standalone: true,
  imports: [],
  templateUrl: './data-observable.component.html',
  styleUrls: ['./data-observable.component.scss']
})
export class DataObservableComponent implements OnInit {
  public data: any[] = [];
  public selectedItem: any;

  constructor(private dataService: DataJsonService) {}
 
  // สร้าง Observable ที่ emit ตัวเลข 1, 2, 3, 4

  ngOnInit(): void {
    this.fetchData();

    const numbersof$ = of(1, 2, 3, 4);
    // ใช้ pipe เพื่อแปลงข้อมูล
    numbersof$.pipe(
      filter(x => x % 2 === 0),   // คัดกรองเฉพาะเลขคู่
      map(x => x * 2)              // คูณค่าที่เหลือด้วย 2
    ).subscribe({
      next: value => console.log(value), // แสดงผลลัพธ์
      error: err => console.error(err),
      complete: () => console.log('Completed')
    });


    // สร้าง Observable จาก array ของตัวเลข
    const numbersform$ = from([1, 2, 3, 4]);
    numbersform$.pipe(
      map(x => x * x),            // คูณค่าด้วยตัวมันเอง
      reduce((acc, value) => acc + value, 0) // หาผลรวมของค่าที่ได้รับ
    ).subscribe({
      next: total => console.log(total), // แสดงผลลัพธ์
      error: err => console.error(err),
      complete: () => console.log('Completed')
    });

  }

  fetchData(): void {
    this.dataService.getData()
      .pipe(
        map(items => items.filter(item => item.id % 2 === 0)) // คัดกรองเฉพาะ item ที่มี id เป็นเลขคู่
      )
      .subscribe({
        next: (result) => {
          this.data = result; // รับข้อมูล JSON และจัดการกับข้อมูลที่ได้รับ
        },
        error: (err) => {
          console.error('Failed to fetch data', err);
        }
      });
  }

  fetchItemById(id: number): void {
    this.dataService.getDataById(id)
      .subscribe({
        next: (item) => {
          this.selectedItem = item; // รับข้อมูล JSON ของ item ที่เลือก
        },
        error: (err) => {
          console.error('Failed to fetch item', err);
        }
      });
  }
}
