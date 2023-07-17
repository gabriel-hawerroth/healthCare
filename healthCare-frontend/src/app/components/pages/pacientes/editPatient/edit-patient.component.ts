import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/paciente/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  patient!: Patient;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.patientService.getById(id).subscribe((item) => {
        this.patient = item;
        console.log('item');
        console.log(item);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
