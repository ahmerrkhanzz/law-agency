import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "ngx-toggle-switch";
import { SharedModule } from "../components/shared.module";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DevicesComponent } from "./devices/devices.component";
import { AdminAsideComponent } from "../admin/admin-aside/admin-aside.component";
import { FormsModule } from "@angular/forms";
import { PagesService } from "./pages.service";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DevicesComponent,
    AdminAsideComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    UiSwitchModule,
    SharedModule,
    PagesRoutingModule,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    DevicesComponent,
    AdminAsideComponent,
  ],
  providers: [PagesService],
})
export class PagesModule {}
