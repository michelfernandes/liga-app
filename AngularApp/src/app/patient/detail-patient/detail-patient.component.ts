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

  financialDataObject: { [key: string]: any };

  /*{
    'Medicamentos': [
      {
        value: 0.00,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12.01,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
    ],
    'Rancho': [
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      },
    ]
  };*/

  testData = {
    'Medicamentos': [
      {
        value: 12,
        date: '14/01',
        type: 'medicamentos'
      }
    ],
    'Exames': [],
    'Rancho': [],
    'Outros': []
  };

  patientService:PatientService;

  constructor(patientService:PatientService, private route: ActivatedRoute, private mapsAPILoader:MapsAPILoader) { 
    this.patientService = patientService;
  }

  ngOnInit(): void {   
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.getPatient();
      this.getPatientFinancialData();
    });
  }

  getPatient(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(_id).subscribe((res) => {
      this.patientService.selectedPatient = res as Patient;
      this.getLatAndLong(this.patientService.selectedPatient.address);
    });
  }

  getPatientFinancialData(): void {

    const _id = this.route.snapshot.paramMap.get('id');
    let year = '2014';

    

    this.patientService.getPatientFinancialData(_id,year).subscribe((res) => {
      this._buildFinancialDataObject(res, '2014');
    });
  }

  onSaveChanges(): void{
    this.patientService.putPatient(this.patientService.selectedPatient).subscribe((res) => {
      this.editMode=false;
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

  _buildFinancialDataObject(financialData, year){
    let patientId = this.route.snapshot.paramMap.get('id');
    let financialDataObj = {
      'Medicamentos': [...new Array(12)].map((e,i)=> ({
        value: 0,
        date: new Date(year, i, 15), 
        type: 'Medicamentos',
        patient: patientId
      })),
      'Exames':[...new Array(12)].map((e,i)=> ({
        value: 0,
        date: new Date(year, i, 15), 
        type: 'Exames',
        patient: patientId
      })),
      'Rancho':[...new Array(12)].map((e,i)=> ({
        value: 0,
        date: new Date(year, i, 15), 
        type: 'Rancho',
        patient: patientId
      })),
      'Outros':[...new Array(12)].map((e,i)=> ({
        value: 0,
        date: new Date(year, i, 15), 
        type: 'Outros',
        patient: patientId
      }))
    };
    this.financialDataObject = financialDataObj;
    console.log(this.financialDataObject);
  }
}
