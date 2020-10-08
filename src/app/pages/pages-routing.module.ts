import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RouteGuardService } from '../shared/route-guard.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DevicesComponent } from "./devices/devices.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: "dashboard",
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [RouteGuardService],
      },
      {
        path: "devices",
        component: DevicesComponent,
        canActivate: [RouteGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
