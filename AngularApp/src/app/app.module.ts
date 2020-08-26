import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientComponent } from './pacient/pacient.component';
import { ListPacientComponent } from './pacient/list-pacient/list-pacient.component';
import { NewPacientComponent } from './pacient/new-pacient/new-pacient.component';

@NgModule({
  declarations: [
    AppComponent,
    PacientComponent,
    ListPacientComponent,
    NewPacientComponent
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
