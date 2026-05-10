import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Students } from './students/students';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },
  {
    path: 'students',
    component: Students
  }
];
