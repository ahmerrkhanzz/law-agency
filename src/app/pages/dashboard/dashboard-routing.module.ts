import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LegalOpinionIComponent } from './legal-opinion/legal-opinion-i/legal-opinion-i.component';
import { LegalOpinionComponent } from './legal-opinion/legal-opinion.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: LegalOpinionComponent
      },
      {
        path: 'legal-opinion',
        component: LegalOpinionIComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
