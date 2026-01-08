import {RouterModule, Routes} from '@angular/router';
import {PortalAdminComponent} from './portal-admin.component';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';
import {BanksComponent} from './banks/banks.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: PortalAdminComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'banks',
    component: BanksComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalAdminRoutingModule {}
