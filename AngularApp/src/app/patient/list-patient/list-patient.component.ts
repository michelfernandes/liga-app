import { Component, OnInit } from '@angular/core';


import { PatientService } from '../../shared/patient.service';
import { Patient } from '../../shared/patient.model';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {

  patientService:PatientService;
  constructor(patientService:PatientService) {
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.refreshPatientList();
  }

  refreshPatientList() {
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }

}
