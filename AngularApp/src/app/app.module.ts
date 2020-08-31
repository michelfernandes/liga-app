import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ListPatientComponent,
    NewPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
