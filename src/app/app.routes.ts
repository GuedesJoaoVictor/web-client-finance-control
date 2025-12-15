import { Routes } from '@angular/router';
import {LoginComponent} from './login-component/login-component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
