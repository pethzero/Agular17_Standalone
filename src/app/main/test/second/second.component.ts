import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {
  // ตัวแปรที่ใช้ใน template
  selItem: any = {
    impvendors: []
  };

  impvendors: any[] = [
    { id: 1, shortname: 'Vendor 1' },
    { id: 2, shortname: 'Vendor 2' },
    { id: 3, shortname: 'Vendor 3' }
    // เพิ่มเติม vendor ตามที่ต้องการ
  ];

  constructor() {}

  // ฟังก์ชันที่ใช้ในการลบรายการออกจาก selItem.impvendors
  deleteConf(arrayName: string, index: number) {
    if (arrayName === 'impvendors') {
      this.selItem.impvendors.splice(index, 1);
    }
  }


  tb_data: any[] = [];
  filter_user: any[] = [
    { value: 'User1', text: 'John Doe' },
    { value: 'User2', text: 'Jane Doe' },
    { value: 'User3', text: 'Alice Smith' }
  ];
  addItem() {
    this.tb_data.push({ data: '' });
  }

  deleteItem(index: number) {
    if (this.tb_data.length > 1) {
      this.tb_data.splice(index, 1);
    }
  }

  Test(){
    console.log(this.tb_data);
  }

}
