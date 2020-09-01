import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';
import { DetailPatientComponent } from './patient/detail-patient/detail-patient.component';

const routes: Routes = [
  { path: 'patient/list' , component: ListPatientComponent },
  { path: 'patient/new' , component: NewPatientComponent},
  { path: 'patient/detail' , component: DetailPatientComponent},
  { path: '' , redirectTo:'/patient/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
