import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { Pacient } from './pacient.model';

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  selectedPacient: Pacient;
  pacients: Pacient[];
  readonly baseURL = 'http://localhost:3000/pacient/';


  constructor(private http: HttpClient) { }

  postPacient(pacient: Pacient) {
    return this.http.post(this.baseURL, pacient);
  }

  getPacientList() {
    return this.http.get(this.baseURL);
  }

  putPacient(pacient: Pacient) {
    return this.http.put(this.baseURL + `/${pacient._id}`, pacient);
  }

  deletePacient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
