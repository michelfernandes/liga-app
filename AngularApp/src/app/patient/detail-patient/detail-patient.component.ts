import { EditableFieldComponent } from './../../shared/components/editable-field/editable-field.component';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { MapsAPILoader } from "@agm/core";

import { PatientService } from '../../shared/patient.service';
import { Patient } from '../../shared/patient.model';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit {


  // Maps Variables
  private geoCoder;
  latitude: number;
  longitude: number;
  zoom:number = 15;

  // Control Variables
  editMode:boolean = false;

  patientService:PatientService;

  constructor(patientService:PatientService, private route: ActivatedRoute, private mapsAPILoader:MapsAPILoader) { 
    this.patientService = patientService;
  }

  ngOnInit(): void {
    

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.getPatient();
    });
  }

  getPatient(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(_id).subscribe((res) => {
      this.patientService.selectedPatient = res as Patient;
      this.getLatAndLong(this.patientService.selectedPatient.address);
    });
  }

  getLatAndLong(address:string){
    this.geoCoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.latitude = results[0].geometry.location.lat()
          this.longitude = results[0].geometry.location.lng()
        } else {
          window.alert('Geocoder no results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
