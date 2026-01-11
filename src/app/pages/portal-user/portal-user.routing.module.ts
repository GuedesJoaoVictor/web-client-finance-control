import { RouterModule, Routes } from "@angular/router";
import { PortalUserComponent } from "./portal-user.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: PortalUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],  
    exports: [RouterModule]
})

export class PortalUserRoutingModule {}
