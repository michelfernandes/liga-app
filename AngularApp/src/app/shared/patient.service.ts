import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  selectedPatient: Patient;
  patients: Patient[];
  readonly baseURL = 'http://localhost:3000/patient/';


  constructor(private http: HttpClient) { }

  postPatient(patient: Patient) {
    return this.http.post(this.baseURL, patient);
  }

  getPatient(_id: string) {
    return this.http.get(this.baseURL + `${_id}`);
  }

  getPatientList() {
    return this.http.get(this.baseURL);
  }

  getPatientFinancialData(_id:string, year:string) {
    return this.http.get(this.baseURL + `${_id}/financialdata/${year}`);
  }

  putPatient(patient: Patient) {
    return this.http.put(this.baseURL + `${patient._id}`, patient);
  }

  deletePatient(_id: string) {
    return this.http.delete(this.baseURL + `${_id}`);
  }
}
