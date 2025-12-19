import {RouterModule, Routes} from '@angular/router';
import {PortalAdminComponent} from './portal-admin.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PortalAdminComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalAdminRoutingModule {}
