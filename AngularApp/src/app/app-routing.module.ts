import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPacientComponent } from './pacient/list-pacient/list-pacient.component';
import { NewPacientComponent } from './pacient/new-pacient/new-pacient.component';

const routes: Routes = [
  { path: 'pacient/list' , component: ListPacientComponent },
  { path: 'pacient/new' , component: NewPacientComponent},
  { path: '' , redirectTo:'/pacient/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
