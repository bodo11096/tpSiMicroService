import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Absence } from '../../models/student.model';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Student Absences</h2>
        <button class="btn btn-primary" (click)="showNewAbsenceForm = true">
          Report Absence
        </button>
      </div>

      <div *ngIf="showNewAbsenceForm" class="bg-gray-50 p-4 rounded-lg border mb-4">
        <h3 class="text-lg font-semibold mb-3">Report New Absence</h3>
        <form class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Student ID</label>
            <input type="number" [(ngModel)]="newAbsence.studentId" name="studentId" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Course Code</label>
            <input type="text" [(ngModel)]="newAbsence.courseCode" name="courseCode" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" [(ngModel)]="newAbsence.date" name="date" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration (hours)</label>
            <input type="number" [(ngModel)]="newAbsence.duration" name="duration" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Justified</label>
            <input type="checkbox" [(ngModel)]="newAbsence.justified" name="justified" 
                   class="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div *ngIf="newAbsence.justified">
            <label class="block text-sm font-medium text-gray-700">Justification</label>
            <textarea [(ngModel)]="newAbsence.justification" name="justification" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                     rows="3"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" class="btn bg-gray-500 text-white hover:bg-gray-600" 
                    (click)="showNewAbsenceForm = false">Cancel</button>
            <button type="submit" class="btn btn-primary" (click)="submitAbsence()">Submit</button>
          </div>
        </form>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2">Student ID</th>
              <th class="px-4 py-2">Course Code</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Duration</th>
              <th class="px-4 py-2">Justified</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let absence of absences">
              <td class="px-4 py-2">{{absence.studentId}}</td>
              <td class="px-4 py-2">{{absence.courseCode}}</td>
              <td class="px-4 py-2">{{absence.date | date}}</td>
              <td class="px-4 py-2">{{absence.duration}}h</td>
              <td class="px-4 py-2">
                <span [class]="absence.justified ? 'text-green-600' : 'text-red-600'">
                  {{absence.justified ? 'Yes' : 'No'}}
                </span>
              </td>
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
export class AbsencesComponent implements OnInit {
  absences: Absence[] = [];
  showNewAbsenceForm = false;
  newAbsence: Partial<Absence> = {
    date: new Date(),
    duration: 1,
    justified: false
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAbsences();
  }

  loadAbsences() {
    // For now, we'll load all absences. In a real app, you might want to paginate or filter
    this.apiService.getStudentAbsences(0).subscribe(
      data => this.absences = data,
      error => console.error('Error fetching absences:', error)
    );
  }

  submitAbsence() {
    if (!this.newAbsence.studentId || !this.newAbsence.courseCode || !this.newAbsence.date || !this.newAbsence.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const absence = {
      ...this.newAbsence,
      date: new Date(this.newAbsence.date)
    } as Omit<Absence, 'id'>;

    this.apiService.reportAbsence(absence).subscribe(
      response => {
        this.absences = [...this.absences, response];
        this.showNewAbsenceForm = false;
        this.newAbsence = {
          date: new Date(),
          duration: 1,
          justified: false
        };
      },
      error => console.error('Error reporting absence:', error)
    );
  }
}