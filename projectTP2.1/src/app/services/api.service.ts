import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student, Inscription, Absence } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Student Service Endpoints
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students`).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        throw error;
      })
    );
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.API_URL}/students`, student).pipe(
      catchError(error => {
        console.error('Error creating student:', error);
        throw error;
      })
    );
  }

  updateStudent(id: number, student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.put<Student>(`${this.API_URL}/students/${id}`, student).pipe(
      catchError(error => {
        console.error('Error updating student:', error);
        throw error;
      })
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/students/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting student:', error);
        throw error;
      })
    );
  }

  // Inscription Service Endpoints
  getInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.API_URL}/inscriptions`).pipe(
      catchError(error => {
        console.error('Error fetching inscriptions:', error);
        throw error;
      })
    );
  }

  getStudentInscriptions(studentId: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.API_URL}/inscriptions/student/${studentId}`).pipe(
      catchError(error => {
        console.error('Error fetching student inscriptions:', error);
        throw error;
      })
    );
  }

  createInscription(inscription: Omit<Inscription, 'id'>): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.API_URL}/inscriptions`, inscription).pipe(
      catchError(error => {
        console.error('Error creating inscription:', error);
        throw error;
      })
    );
  }

  updateInscription(id: number, inscription: Omit<Inscription, 'id'>): Observable<Inscription> {
    return this.http.put<Inscription>(`${this.API_URL}/inscriptions/${id}`, inscription).pipe(
      catchError(error => {
        console.error('Error updating inscription:', error);
        throw error;
      })
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/inscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting inscription:', error);
        throw error;
      })
    );
  }
}