import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup').then(m => m.Signup)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'agenda',
    canActivate: [authGuard],
    loadComponent: () => import('./components/agenda/agenda').then(m => m.Agenda)
  },
  {
    path: 'patients',
    canActivate: [authGuard],
    loadComponent: () => import('./components/patient-list/patient-list').then(m => m.PatientList)
  },
  {
    path: 'patients/new',
    canActivate: [authGuard],
    loadComponent: () => import('./components/new-patient/new-patient').then(m => m.NewPatient)
  },
  {
    path: 'patients/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/patient/patient').then(m => m.PatientComponent)
  },
  {
    path: 'patients/:id/edit',
    canActivate: [authGuard],
    loadComponent: () => import('./components/edit-patient/edit-patient').then(m => m.EditPatient)
  },
  {
    path: 'evolution/new',
    canActivate: [authGuard],
    loadComponent: () => import('./components/new-evolution/new-evolution').then(m => m.NewEvolution)
  },
  {
    path: 'report/new',
    canActivate: [authGuard],
    loadComponent: () => import('./components/new-report/new-report').then(m => m.NewReport)
  },
  {
    path: 'evolution/view',
    canActivate: [authGuard],
    loadComponent: () => import('./components/view-evolution/view-evolution').then(m => m.ViewEvolution)
  },
  {
    path: 'report/view',
    canActivate: [authGuard],
    loadComponent: () => import('./components/view-report/view-report').then(m => m.ViewReport)
  }
];
