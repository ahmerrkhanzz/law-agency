import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "ngx-toggle-switch";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../components/shared.module";
import { NgxNavDrawerModule } from "ngx-nav-drawer";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdminAsideComponent } from "./admin-aside/admin-aside.component";
import { PatientsModule } from "./patients/patients.module";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    UiSwitchModule,
    AdminRoutingModule,
    NgxNavDrawerModule,
    SharedModule,
    PatientsModule,
  ],
  exports: [AdminComponent],
  providers: [],
})
export class AdminModule {}
