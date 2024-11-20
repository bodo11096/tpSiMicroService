import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'students',
    loadComponent: () => import('./pages/students/students.component')
      .then(m => m.StudentsComponent)
  },
  {
    path: 'inscriptions',
    loadComponent: () => import('./pages/inscriptions/inscriptions.component')
      .then(m => m.InscriptionsComponent)
  },
  {
    path: 'absences',
    loadComponent: () => import('./pages/absences/absences.component')
      .then(m => m.AbsencesComponent)
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];