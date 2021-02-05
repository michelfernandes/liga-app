import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailPatientComponent } from './patient/detail-patient/detail-patient.component';
import { AgmCoreModule } from '@agm/core';
import { EditableFieldComponent } from './shared/components/editable-field/editable-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPatientComponent,
    NewPatientComponent,
    SidebarComponent,
    HeaderComponent,
    DetailPatientComponent,
    EditableFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
