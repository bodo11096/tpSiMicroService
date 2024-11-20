export interface Student {
  id: number;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  department: string;
}

export interface Inscription {
  id: number;
  studentId: number;
  academicYear: string;
  level: string;
  registrationDate: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Absence {
  id: number;
  studentId: number;
  courseCode: string;
  date: Date;
  duration: number;
  justified: boolean;
  justification?: string;
}