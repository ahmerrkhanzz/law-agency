import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: "./patients/patients.module#PatientsModule",
      },
      // {
      //   path: "dashboard",
      //   component: DashboardComponent,
      // },
      {
        path: "patients",
        loadChildren: "./patients/patients.module#PatientsModule",
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
