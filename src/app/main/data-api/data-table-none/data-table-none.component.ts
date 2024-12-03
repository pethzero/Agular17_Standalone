import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
// import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-data-table-none',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table-none.component.html',
  styleUrl: './data-table-none.component.scss'
})
export class DataTableNoneComponent {
  list_student: any[] = [];
  newStudent: any = { name: '', detail: '' };

  changemodeAction(student: any): void {
    student.editing = true;
  }

  updateAction(student: any): void {
    student.editing = false;
    // อัปเดตข้อมูลของ student ใน list_student
  }

  cancelAction(student: any): void {
    student.editing = false;
    // ยกเลิกการแก้ไขข้อมูล
  }

  deleteAction(student: any): void {
    this.list_student = this.list_student.filter(s => s.id !== student.id);
  }

  addStudent(): void {
    const newId = this.list_student.length ? Math.max(...this.list_student.map(s => s.id)) + 1 : 1;
    this.list_student.push({ ...this.newStudent, id: newId, editing: false });
    this.newStudent = { name: '', detail: '' }; // เคลียร์ข้อมูลหลังจากเพิ่มเสร็จ
    console.log(this.list_student);
  }

  //////////////////////////////////// NEW ////////////////////////////////////

  addStudentNew() {
    this.list_student.push({ ...this.newStudent, id:null , editing: false });
    this.newStudent = { name: '', detail: '' }; // เคลียร์ข้อมูลหลังจากเพิ่มเสร็จ
    }
    
  deleteActionNew(index: number) {
    if (this.list_student.length > 1) {
      this.list_student.splice(index, 1);
    }
  }

  checkData()
  {
    if(this.list_student.length > 0){
      this.list_student.forEach(student => student.editing = false);
    }
    console.log(this.list_student);
  }

}
