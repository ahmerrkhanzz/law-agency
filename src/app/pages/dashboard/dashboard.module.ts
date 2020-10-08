import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AddPropertyComponent } from "./add-property/add-property.component";
import { DashboardComponent } from "./dashboard.component";
import { LegalOpinionComponent } from './legal-opinion/legal-opinion.component';

@NgModule({
  declarations: [DashboardComponent, AddPropertyComponent, LegalOpinionComponent],
  imports: [CommonModule, FormsModule, DashboardRoutingModule],
  exports: [DashboardComponent, AddPropertyComponent, LegalOpinionComponent],
})
export class DashboardModule {}
