import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'portal-admin',
    loadChildren: () => import('./pages/portal-admin/portal-admin.module').then(m => m.PortalAdminModule)
  },
  {
    path: 'portal-user',
    loadChildren: () => import('./pages/portal-user/portal-user.module').then(m => m.PortalUserModule)
  }
];
