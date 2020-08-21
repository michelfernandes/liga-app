import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PacientService } from '../shared/pacient.service';
import { Pacient } from '../shared/pacient.model';

declare var M:any;

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss'],
  providers: [PacientService]
})
export class PacientComponent implements OnInit {
  pacientService:PacientService;
  constructor(pacientService:PacientService) {
    this.pacientService = pacientService;
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshPacientList();
  }

  resetForm(form?: NgForm){
    if (form)
      form.reset();
    this.pacientService.selectedPacient = {
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
      this.pacientService.postPacient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPacientList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.pacientService.putPacient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPacientList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshPacientList() {
    this.pacientService.getPacientList().subscribe((res) => {
      this.pacientService.pacients = res as Pacient[];
    });
  }

  onEdit(pacient: Pacient) {
    this.pacientService.selectedPacient = pacient;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.pacientService.deletePacient(_id).subscribe((res) => {
        this.refreshPacientList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
