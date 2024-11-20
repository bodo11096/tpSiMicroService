import { Injectable } from '@angular/core';
import { Student, Inscription, Absence } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private students: Student[] = [
    {
      id: 1,
      matricule: '2024001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@isj.edu',
      dateOfBirth: new Date('1999-05-15'),
      phoneNumber: '+237612345678',
      department: 'Computer Science'
    },
    {
      id: 2,
      matricule: '2024002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@isj.edu',
      dateOfBirth: new Date('2000-03-20'),
      phoneNumber: '+237623456789',
      department: 'Engineering'
    }
  ];

  private inscriptions: Inscription[] = [
    {
      id: 1,
      studentId: 1,
      academicYear: '2023-2024',
      level: 'L3',
      registrationDate: new Date('2023-09-01'),
      status: 'APPROVED'
    },
    {
      id: 2,
      studentId: 2,
      academicYear: '2023-2024',
      level: 'L2',
      registrationDate: new Date('2023-09-02'),
      status: 'PENDING'
    }
  ];

  private absences: Absence[] = [
    {
      id: 1,
      studentId: 1,
      courseCode: 'CS301',
      date: new Date('2024-02-01'),
      duration: 2,
      justified: true,
      justification: 'Medical appointment'
    },
    {
      id: 2,
      studentId: 2,
      courseCode: 'ENG201',
      date: new Date('2024-02-05'),
      duration: 4,
      justified: false
    }
  ];

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(student: Omit<Student, 'id'>): Student {
    const newStudent = {
      ...student,
      id: this.students.length + 1
    };
    this.students.push(newStudent);
    return newStudent;
  }

  getInscriptions(): Inscription[] {
    return [...this.inscriptions];
  }

  addInscription(inscription: Omit<Inscription, 'id'>): Inscription {
    const newInscription = {
      ...inscription,
      id: this.inscriptions.length + 1
    };
    this.inscriptions.push(newInscription);
    return newInscription;
  }

  getAbsences(): Absence[] {
    return [...this.absences];
  }

  addAbsence(absence: Omit<Absence, 'id'>): Absence {
    const newAbsence = {
      ...absence,
      id: this.absences.length + 1
    };
    this.absences.push(newAbsence);
    return newAbsence;
  }
}