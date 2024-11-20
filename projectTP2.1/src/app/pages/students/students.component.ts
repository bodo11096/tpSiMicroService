import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Student Management</h2>
        <button class="btn btn-primary" (click)="showNewStudentForm = true">
          Add Student
        </button>
      </div>

      <div *ngIf="showNewStudentForm" class="bg-gray-50 p-4 rounded-lg border mb-4">
        <h3 class="text-lg font-semibold mb-3">New Student</h3>
        <form class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Matricule</label>
            <input type="text" [(ngModel)]="newStudent.matricule" name="matricule" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" [(ngModel)]="newStudent.firstName" name="firstName" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" [(ngModel)]="newStudent.lastName" name="lastName" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" [(ngModel)]="newStudent.email" name="email" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" [(ngModel)]="newStudent.dateOfBirth" name="dateOfBirth" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" [(ngModel)]="newStudent.phoneNumber" name="phoneNumber" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <select [(ngModel)]="newStudent.department" name="department" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" class="btn bg-gray-500 text-white hover:bg-gray-600" 
                    (click)="showNewStudentForm = false">Cancel</button>
            <button type="submit" class="btn btn-primary" (click)="submitStudent()">Submit</button>
          </div>
        </form>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2">Matricule</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Department</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">
              <td class="px-4 py-2">{{student.matricule}}</td>
              <td class="px-4 py-2">{{student.firstName}} {{student.lastName}}</td>
              <td class="px-4 py-2">{{student.email}}</td>
              <td class="px-4 py-2">{{student.department}}</td>
              <td class="px-4 py-2">
                <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  showNewStudentForm = false;
  newStudent: Partial<Student> = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.apiService.getStudents().subscribe(
      data => this.students = data,
      error => console.error('Error fetching students:', error)
    );
  }

  submitStudent() {
    if (!this.newStudent.matricule || !this.newStudent.firstName || !this.newStudent.lastName || 
        !this.newStudent.email || !this.newStudent.department) {
      alert('Please fill in all required fields');
      return;
    }

    this.apiService.createStudent(this.newStudent as Omit<Student, 'id'>).subscribe(
      response => {
        this.students = [...this.students, response];
        this.showNewStudentForm = false;
        this.newStudent = {};
      },
      error => console.error('Error creating student:', error)
    );
  }
}