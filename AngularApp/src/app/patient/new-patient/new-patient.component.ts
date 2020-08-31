import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PatientService } from '../../shared/patient.service';
import { Patient } from '../../shared/patient.model';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  patientService:PatientService;
  constructor(patientService:PatientService, private route: ActivatedRoute, private router: Router ) {
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.resetForm();
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

  refreshPatientList() {
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.value._id == "") {
      this.patientService.postPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        this.router.navigate(['/patient/new'], { relativeTo: this.route });
        //M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.patientService.putPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        //M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

}
