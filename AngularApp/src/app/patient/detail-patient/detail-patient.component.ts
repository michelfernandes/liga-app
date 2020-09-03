import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PatientService } from '../../shared/patient.service';
import { Patient } from '../../shared/patient.model';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit {

  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;

  patientService:PatientService;
  constructor(patientService:PatientService, private route: ActivatedRoute) { 
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    const that = this;
    this.patientService.getPatient(_id).subscribe((res) => {
      this.patientService.selectedPatient = res as Patient;
      that.getLatAndLong(this.patientService.selectedPatient.address);
    });
  }

  getLatAndLong(address:string){
    
  }
}
