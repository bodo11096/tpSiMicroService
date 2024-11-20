import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Inscription } from '../../models/student.model';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Student Inscriptions</h2>
        <button class="btn btn-primary" (click)="showNewInscriptionForm = true">
          New Inscription
        </button>
      </div>

      <div *ngIf="showNewInscriptionForm" class="bg-gray-50 p-4 rounded-lg border mb-4">
        <h3 class="text-lg font-semibold mb-3">New Inscription</h3>
        <form class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Student ID</label>
            <input type="number" [(ngModel)]="newInscription.studentId" name="studentId" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Academic Year</label>
            <input type="text" [(ngModel)]="newInscription.academicYear" name="academicYear" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Level</label>
            <select [(ngModel)]="newInscription.level" name="level" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="L1">Level 1</option>
              <option value="L2">Level 2</option>
              <option value="L3">Level 3</option>
              <option value="M1">Master 1</option>
              <option value="M2">Master 2</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" class="btn bg-gray-500 text-white hover:bg-gray-600" 
                    (click)="showNewInscriptionForm = false">Cancel</button>
            <button type="submit" class="btn btn-primary" (click)="submitInscription()">Submit</button>
          </div>
        </form>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2">Student ID</th>
              <th class="px-4 py-2">Academic Year</th>
              <th class="px-4 py-2">Level</th>
              <th class="px-4 py-2">Registration Date</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inscription of inscriptions">
              <td class="px-4 py-2">{{inscription.studentId}}</td>
              <td class="px-4 py-2">{{inscription.academicYear}}</td>
              <td class="px-4 py-2">{{inscription.level}}</td>
              <td class="px-4 py-2">{{inscription.registrationDate | date}}</td>
              <td class="px-4 py-2">
                <span [class]="getStatusClass(inscription.status)">
                  {{inscription.status}}
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
export class InscriptionsComponent implements OnInit {
  inscriptions: Inscription[] = [];
  showNewInscriptionForm = false;
  newInscription: Partial<Inscription> = {
    academicYear: new Date().getFullYear().toString(),
    level: 'L1',
    status: 'PENDING'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInscriptions();
  }

  loadInscriptions() {
    this.apiService.getInscriptions().subscribe(
      data => this.inscriptions = data,
      error => console.error('Error fetching inscriptions:', error)
    );
  }

  submitInscription() {
    if (!this.newInscription.studentId || !this.newInscription.academicYear || !this.newInscription.level) {
      alert('Please fill in all required fields');
      return;
    }

    const inscription = {
      ...this.newInscription,
      registrationDate: new Date(),
      status: 'PENDING'
    } as Omit<Inscription, 'id'>;

    // Here we would typically call the API service to create the inscription
    console.log('Submitting inscription:', inscription);
    this.showNewInscriptionForm = false;
    this.newInscription = {
      academicYear: new Date().getFullYear().toString(),
      level: 'L1',
      status: 'PENDING'
    };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm';
      case 'REJECTED':
        return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm';
      default:
        return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm';
    }
  }
}