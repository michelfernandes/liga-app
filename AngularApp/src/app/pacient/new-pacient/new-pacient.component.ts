import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PacientService } from '../../shared/pacient.service';
import { Pacient } from '../../shared/pacient.model';

@Component({
  selector: 'app-new-pacient',
  templateUrl: './new-pacient.component.html',
  styleUrls: ['./new-pacient.component.scss']
})
export class NewPacientComponent implements OnInit {

  pacientService:PacientService;
  constructor(pacientService:PacientService, private route: ActivatedRoute, private router: Router ) {
    this.pacientService = pacientService;
  }

  ngOnInit(): void {
    this.resetForm();
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

  refreshPacientList() {
    this.pacientService.getPacientList().subscribe((res) => {
      this.pacientService.pacients = res as Pacient[];
    });
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.value._id == "") {
      this.pacientService.postPacient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPacientList();
        this.router.navigate(['/pacient/new'], { relativeTo: this.route });
        //M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.pacientService.putPacient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPacientList();
        //M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

}
