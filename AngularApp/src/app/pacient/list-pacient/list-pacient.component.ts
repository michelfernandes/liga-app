import { Component, OnInit } from '@angular/core';


import { PacientService } from '../../shared/pacient.service';
import { Pacient } from '../../shared/pacient.model';

@Component({
  selector: 'app-list-pacient',
  templateUrl: './list-pacient.component.html',
  styleUrls: ['./list-pacient.component.scss']
})
export class ListPacientComponent implements OnInit {

  pacientService:PacientService;
  constructor(pacientService:PacientService) {
    this.pacientService = pacientService;
  }

  ngOnInit(): void {
    this.refreshPacientList();
  }

  refreshPacientList() {
    this.pacientService.getPacientList().subscribe((res) => {
      this.pacientService.pacients = res as Pacient[];
    });
  }

}
