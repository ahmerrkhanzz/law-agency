import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AddPropertyComponent } from "./add-property/add-property.component";
import { DashboardComponent } from "./dashboard.component";
import { LegalOpinionComponent } from './legal-opinion/legal-opinion.component';
import { LegalOpinionIComponent } from './legal-opinion/legal-opinion-i/legal-opinion-i.component';
import { GeneralInformationComponent } from './legal-opinion/legal-opinion-i/general-information/general-information.component';
import { ListOfDocumentsComponent } from './legal-opinion/legal-opinion-i/list-of-documents/list-of-documents.component';
import { ListOfDocumentsIiComponent } from './legal-opinion/legal-opinion-i/list-of-documents-ii/list-of-documents-ii.component';

@NgModule({
  declarations: [DashboardComponent, AddPropertyComponent, LegalOpinionComponent, LegalOpinionIComponent, GeneralInformationComponent, ListOfDocumentsComponent, ListOfDocumentsIiComponent],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule,
    SharedModule, DashboardRoutingModule],
  exports: [DashboardComponent, AddPropertyComponent, LegalOpinionComponent, LegalOpinionIComponent, GeneralInformationComponent, ListOfDocumentsComponent, ListOfDocumentsIiComponent],
})
export class DashboardModule { }
