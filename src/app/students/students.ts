import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  students: any[] = [];

  student = {
    id: 0,
    name: '',
    email: '',
    age: 0,
    course: ''
  };

  isEdit = false;

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {

    this.api.getStudents().subscribe((res: any) => {
        this.students = [...res];

    this.cdr.detectChanges();
    });
  }

  addOrUpdateStudent() {

    if (!this.student.email.includes('@')) {
  alert('Enter valid email : xxx@gmail.com');
  return;
}
    if (this.isEdit) {

      this.api.updateStudent(
        this.student.id,
        this.student
      ).subscribe(() => {

        this.loadStudents();

        this.resetForm();
      });

    } else {

      this.api.addStudent(this.student).subscribe(() => {

        this.loadStudents();

        this.resetForm();
      });
    }
  }

  editStudent(s: any) {

    this.isEdit = true;

    this.student = {
      id: s.id,
      name: s.name,
      email: s.email,
      age: s.age,
      course: s.course
    };
  }

  deleteStudent(id: number) {

  this.api.deleteStudent(id).subscribe(() => {

    this.students = this.students.filter(
      s => s.id !== id
    );

       this.loadStudents();

     this.cdr.detectChanges();
  });
}


  resetForm() {

    this.isEdit = false;

    this.student = {
      id: 0,
      name: '',
      email: '',
      age: 0,
      course: ''
    };
    }
 
}
