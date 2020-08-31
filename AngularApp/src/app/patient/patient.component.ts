import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/patient.model';

declare var M:any;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {
  patientService:PatientService;
  constructor(patientService:PatientService) {
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshPatientList();
  }

  resetForm(form?: NgForm){
    if (form)
      form.reset();
    this.patientService.selectedPatient = {
      _id: "",
      name: "",
      cpf: "",
      phoneNumber: "",
      dateOfBirth: null,
      disease: "",
      entryDate: null,
      address: ""
    }
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.value._id == "") {
      this.patientService.postPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.patientService.putPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshPatientList() {
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }

  onEdit(patient: Patient) {
    this.patientService.selectedPatient = patient;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.patientService.deletePatient(_id).subscribe((res) => {
        this.refreshPatientList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
