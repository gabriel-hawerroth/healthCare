import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements AfterViewInit {
  patient!: Patient;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.patientService
      .getById(id)
      .subscribe((item) => (this.patient = item.data));

    console.log('this.patient');
    console.log(this.patient);
  }
}
